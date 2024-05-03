import { type CreateExpense } from '@repo/db';
import { type ApiRoutes } from '@server/app';
import { queryOptions } from '@tanstack/react-query';
import { hc } from 'hono/client';

const client = hc<ApiRoutes>('/');

export const api = client.api;

export const userQueryOptions = queryOptions({
  queryFn: async () => {
    const response = await api.me.$get();
    if (!response.ok) throw new Error('Server error');
    return await response.json();
  },
  queryKey: ['get-current-user'],
  staleTime: Number.POSITIVE_INFINITY,
});

export const getAllExpensesQueryOptions = queryOptions({
  queryFn: async () => {
    const response = await api.expenses.$get();
    if (!response.ok) throw new Error('Server error');
    return await response.json();
  },
  queryKey: ['get-all-expenses'],
});

export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: CreateExpense;
}>({
  queryFn: () => {
    return {};
  },
  queryKey: ['loading-create-expense'],
  staleTime: Number.POSITIVE_INFINITY,
});

export async function createExpense({ values }: { values: CreateExpense }) {
  const response = await api.expenses.$post({ json: values });
  if (!response.ok) throw new Error('server error');
  return await response.json();
}

export async function deleteExpense({ id }: { id: number }) {
  const response = await api.expenses[':id{[0-9]+}'].$delete({
    param: { id: id.toString() },
  });
  if (!response.ok) throw new Error('server error');
  return await response.json();
}
