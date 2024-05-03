import { zodResolver } from '@hookform/resolvers/zod';
import { createExpenseSchema } from '@repo/db';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type z } from 'zod';

import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import {
  createExpense,
  getAllExpensesQueryOptions,
  loadingCreateExpenseQueryOptions,
} from '@/libs/api';

export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpense,
});

function CreateExpense() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof createExpenseSchema>>({
    defaultValues: {
      amount: '0',
      date: new Date().toISOString(),
      title: '',
    },
    resolver: zodResolver(createExpenseSchema),
  });

  async function onSubmit(values: z.infer<typeof createExpenseSchema>) {
    const existingExpenses = await queryClient.ensureQueryData(
      getAllExpensesQueryOptions,
    );
    navigate({ to: '/expenses' });
    // loading state
    queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {
      expense: values,
    });
    try {
      const newExpense = await createExpense({ values });
      queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
        ...existingExpenses,
        expenses: [newExpense, ...existingExpenses.expenses],
      });
      toast('Expense Created', {
        description: `Successfully created new expense: ${newExpense.id}`,
      });
    } catch {
      toast('Error', {
        description: 'Failed to create new expense',
      });
    } finally {
      queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {});
    }
  }

  return (
    <div className="mx-auto max-w-lg p-2">
      <Form {...form}>
        <form
          className="flex flex-col space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl">Create Expense</h2>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="self-center">
                <FormControl>
                  <Calendar
                    className="rounded-md border"
                    mode="single"
                    {...field}
                    selected={new Date(field.value)}
                    onSelect={(date) =>
                      field.onChange((date ?? new Date()).toISOString())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting ? 'Loading...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
