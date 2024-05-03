import { type QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router';
import { Suspense } from 'react';

import { ModeToggle } from '@/components/ModeToggle';
import { TanstackRouterDevtools } from '@/components/utils';

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function Navbar() {
  return (
    <div className="m-auto flex max-w-4xl items-baseline justify-between p-2">
      <Link to="/">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
      </Link>
      <div className="flex items-baseline gap-4">
        <div className="flex gap-2">
          <Link className="[&.active]:font-bold" to="/about">
            About
          </Link>
          <Link className="[&.active]:font-bold" to="/expenses">
            Expenses
          </Link>
          <Link className="[&.active]:font-bold" to="/create-expense">
            Create
          </Link>
          <Link className="[&.active]:font-bold" to="/profile">
            Profile
          </Link>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
}

function RootLayout() {
  return (
    <>
      <Navbar />
      <hr />
      <main className="m-auto max-w-4xl p-4">
        <Outlet />
      </main>
      <Suspense>
        <TanstackRouterDevtools />
      </Suspense>
    </>
  );
}
