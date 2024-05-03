import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import {
  Skeleton,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { api } from '@/libs/api';

export const Route = createFileRoute('/_authenticated/expenses')({
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
    <div className="mx-auto max-w-3xl p-2">
      <Table>
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array.from({ length: 3 })
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))
            : data?.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
