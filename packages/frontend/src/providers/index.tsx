import { Toaster } from '@/components/ui';
import { TanstackQueryProvider } from '@/providers/TanstackQueryProvider';
import { TanstackRouterProvider } from '@/providers/TanstackRouterProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

export function Providers() {
  return (
    <ThemeProvider>
      <TanstackQueryProvider>
        <TanstackRouterProvider />
        <Toaster />
      </TanstackQueryProvider>
    </ThemeProvider>
  );
}
