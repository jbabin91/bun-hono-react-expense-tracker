import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

import { TanstackQueryDevtools } from '@/components/utils';

export const queryClient = new QueryClient();

export function TanstackQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Suspense>
        <TanstackQueryDevtools />
      </Suspense>
    </QueryClientProvider>
  );
}
