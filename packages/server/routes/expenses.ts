/* eslint-disable sort-keys-fix/sort-keys-fix */
import { zValidator } from '@hono/zod-validator';
import { and, desc, eq, sum } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

import { db } from '../db';
import { expenseTable } from '../db/schema';
import { getUser } from '../libs/kinde';

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.string(),
});

const createPostSchema = expenseSchema.omit({ id: true });

export const expensesRoute = new Hono()
  .get('/', getUser, async (c) => {
    const user = c.var.user;

    const expenses = await db.query.expenseTable.findMany({
      where: eq(expenseTable.userId, user.id),
      limit: 100,
      orderBy: [desc(expenseTable.createdAt)],
    });

    return c.json({
      expenses,
    });
  })
  .post('/', getUser, zValidator('json', createPostSchema), async (c) => {
    const expense = c.req.valid('json');
    const user = c.var.user;

    const result = await db
      .insert(expenseTable)
      .values({ ...expense, userId: user.id })
      .returning();

    return c.json(result, 201);
  })
  .get('/total-spent', getUser, async (c) => {
    const user = c.var.user;
    const result = await db
      .select({ total: sum(expenseTable.amount) })
      .from(expenseTable)
      .where(eq(expenseTable.userId, user.id))
      .limit(1)
      .then((res) => res[0]);
    return c.json(result);
  })
  .get('/:id{[0-9]+}', async (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const user = c.var.user;

    const expense = await db.query.expenseTable.findFirst({
      where: and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)),
    });

    if (!expense) {
      return c.notFound();
    }
    return c.json(expense);
  })
  .delete('/:id{[0-9]+}', getUser, async (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const user = c.var.user;

    const expense = await db
      .delete(expenseTable)
      .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
      .returning()
      .then((res) => res[0]);

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  });
// .put();
