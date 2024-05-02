import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { api } from '@/libs/api';

export const Route = createFileRoute('/expenses')({
  component: Expenses,
});

async function getAllExpenses() {
  const response = await api.expenses.$get();
  if (!response.ok) throw new Error('Server error');
  const data = await response.json();
  return data;
}

function Expenses() {
  const { isPending, error, data } = useQuery({
    queryFn: getAllExpenses,
    queryKey: ['get-all-expenses'],
  });

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="p-2">
      <pre>{isPending ? '...' : JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
