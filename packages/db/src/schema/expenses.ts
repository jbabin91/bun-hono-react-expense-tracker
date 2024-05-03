/* eslint-disable sort-keys-fix/sort-keys-fix */
import {
  date,
  index,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const expenseTable = pgTable(
  'expenses',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    userId: text('user_id').notNull(),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    date: date('date').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: index('name_idx').on(expenses.userId),
    };
  },
);

// Schema for inserting a new expense - can be used to validate API requests
export const insertExpensesSchema = createInsertSchema(expenseTable, {
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: 'Amount must be a positive number with up to 2 decimal places',
  }),
});
// Schema for selecting an expense - can be used to validate API requests
export const selectExpensesSchema = createSelectSchema(expenseTable).omit({
  createdAt: true,
});

export const createExpenseSchema = insertExpensesSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
});

export const updateExpenseSchema = createExpenseSchema.partial();

export type CreateExpense = z.infer<typeof createExpenseSchema>;
export type UpdateExpense = z.infer<typeof updateExpenseSchema>;
export type Expense = z.infer<typeof selectExpensesSchema>;
