import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { userQueryOptions } from '@/libs/api';

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) return 'Loading...';
  if (error) return 'not logged in';

  return (
    <div className="p-2">
      <h1>Hello from Profile!</h1>
      <p>Hello {data?.user.given_name}</p>
      <a href="/api/logout">Logout</a>
    </div>
  );
}
