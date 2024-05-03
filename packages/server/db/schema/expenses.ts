/* eslint-disable sort-keys-fix/sort-keys-fix */
import {
  index,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const expenseTable = pgTable(
  'expenses',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    userId: text('user_id').notNull(),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: index('name_idx').on(expenses.userId),
    };
  },
);
