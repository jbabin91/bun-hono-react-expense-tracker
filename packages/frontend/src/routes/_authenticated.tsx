import { createFileRoute, Outlet } from '@tanstack/react-router';

import { Button } from '@/components/ui';
import { userQueryOptions } from '@/libs/api';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch {
      return { user: null };
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }
  return <Outlet />;
}

function Login() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-2 p-2">
      <h1 className="text-2xl">You have to login!</h1>
      <Button asChild variant="link">
        <a href="/api/login">Login!</a>
      </Button>
    </div>
  );
}
