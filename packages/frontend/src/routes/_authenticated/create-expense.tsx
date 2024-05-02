import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
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

const formSchema = z.object({
  amount: z.number().int(),
  title: z.string().min(3),
});

function CreateExpense() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      amount: 0,
      title: '',
    },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await api.expenses.$post({ json: values });
    if (!response.ok) throw new Error('Failed to create expense');
    navigate({ to: '/expenses' });
  }

  return (
    <div className="mx-auto max-w-lg p-2">
      <h2>Create Expense</h2>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={!form.formState.isValid} type="submit">
            {form.formState.isSubmitting ? '...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
