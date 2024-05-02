import { type ApiRoutes } from '@server/app';
import { queryOptions } from '@tanstack/react-query';
import { hc } from 'hono/client';

const client = hc<ApiRoutes>('/');

export const api = client.api;

export const userQueryOptions = queryOptions({
  queryFn: async () => {
    const response = await api.me.$get();
    if (!response.ok) throw new Error('Server error');
    return response.json();
  },
  queryKey: ['get-current-user'],
  staleTime: Number.POSITIVE_INFINITY,
});
