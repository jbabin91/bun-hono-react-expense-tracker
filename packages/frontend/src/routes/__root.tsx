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
    <div className="m-auto flex max-w-6xl justify-between p-2">
      <div className="flex gap-2 p-2">
        <Link className="[&.active]:font-bold" to="/">
          Home
        </Link>
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
  );
}

function RootLayout() {
  return (
    <>
      <Navbar />
      <hr />
      <main className="m-auto max-w-6xl p-2">
        <Outlet />
      </main>
      <Suspense>
        <TanstackRouterDevtools />
      </Suspense>
    </>
  );
}
