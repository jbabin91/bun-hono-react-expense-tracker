import { TanstackQueryProvider } from '@/providers/TanstackQueryProvider';
import { TanstackRouterProvider } from '@/providers/TanstackRouterProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

export function Providers() {
  return (
    <ThemeProvider>
      <TanstackQueryProvider>
        <TanstackRouterProvider />
      </TanstackQueryProvider>
    </ThemeProvider>
  );
}
