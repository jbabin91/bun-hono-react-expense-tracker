import { TanstackQueryProvider } from '@/providers/TanstackQueryProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
}
