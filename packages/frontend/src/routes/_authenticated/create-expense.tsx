import { zodResolver } from '@hookform/resolvers/zod';
import { createExpenseSchema } from '@repo/db';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
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
import { api } from '@/libs/api';

export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpense,
});

function CreateExpense() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof createExpenseSchema>>({
    defaultValues: {
      amount: '0',
      date: new Date().toISOString(),
      title: '',
    },
    resolver: zodResolver(createExpenseSchema),
  });

  async function onSubmit(values: z.infer<typeof createExpenseSchema>) {
    console.log(values);
    const response = await api.expenses.$post({ json: values });
    if (!response.ok) throw new Error('Failed to create expense');
    navigate({ to: '/expenses' });
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
