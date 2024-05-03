import { type CreateExpense, type Expense } from '@repo/db';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { toast } from 'sonner';

import { Icons } from '@/components/Icons';
import {
  Button,
  Skeleton,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import {
  deleteExpense,
  getAllExpensesQueryOptions,
  loadingCreateExpenseQueryOptions,
} from '@/libs/api';

export const Route = createFileRoute('/_authenticated/expenses')({
  component: Expenses,
});

function Expenses() {
  const { isPending, error, data } = useQuery(getAllExpensesQueryOptions);
  const { data: loadingCreateExpense } = useQuery(
    loadingCreateExpenseQueryOptions,
  );

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="mx-auto">
      <Table>
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loadingCreateExpense?.expense ? (
            <ExpenseTableRowLoading expense={loadingCreateExpense.expense} />
          ) : null}
          {isPending
            ? Array.from({ length: 3 })
                .fill(0)
                .map((_, i) => <ExpenseTableRowSkeleton key={i} />)
            : data?.expenses.map((expense) => (
                <ExpenseTableRow key={expense.id} expense={expense} />
              ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ExpenseTableRow({ expense }: { expense: Expense }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{expense.id}</TableCell>
      <TableCell>{expense.title}</TableCell>
      <TableCell>{expense.amount}</TableCell>
      <TableCell>{expense.date.split('T')[0]}</TableCell>
      <TableCell>
        <ExpenseDeleteButton id={expense.id} />
      </TableCell>
    </TableRow>
  );
}

function ExpenseDeleteButton({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      toast('Error', {
        description: `Failed to delete expense: ${id}`,
      });
    },
    onSuccess: () => {
      toast('Expense Deleted', {
        description: `Successfully deleted expense: ${id}`,
      });
      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        (existingExpenses) => ({
          ...existingExpenses,
          expenses: existingExpenses!.expenses.filter((e) => e.id !== id),
        }),
      );
    },
  });

  return (
    <Button
      disabled={mutation.isPending}
      size="icon"
      variant="outline"
      onClick={() => mutation.mutate({ id })}
    >
      {mutation.isPending ? '...' : <Icons.Trash className="size-4" />}
    </Button>
  );
}

function ExpenseTableRowLoading({ expense }: { expense: CreateExpense }) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>{expense.title}</TableCell>
      <TableCell>{expense.amount}</TableCell>
      <TableCell>{expense.date.split('T')[0]}</TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
    </TableRow>
  );
}

function ExpenseTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
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
  );
}
