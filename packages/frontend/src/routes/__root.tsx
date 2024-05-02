import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';

import { ModeToggle } from '@/components/ModeToggle';
import { TanstackRouterDevtools } from '@/components/utils';

export const Route = createRootRoute({
  component: RootLayout,
});

function Navbar() {
  return (
    <div className="flex justify-between border-b p-2">
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
          Create Expense
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
      <Outlet />
      <Suspense>
        <TanstackRouterDevtools />
      </Suspense>
    </>
  );
}
