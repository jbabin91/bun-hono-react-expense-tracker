import { useQuery } from '@tanstack/react-query';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { api } from '@/libs/api';

async function getTotalSpent() {
  const response = await api.expenses['total-spent'].$get();
  if (!response.ok) throw new Error('Server error');
  const data = await response.json();
  return data;
}

function App() {
  const { isPending, error, data } = useQuery({
    queryFn: getTotalSpent,
    queryKey: ['get-total-spent'],
  });

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <>
      <Card className="m-auto w-[350px]">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount you&apos;ve spent</CardDescription>
        </CardHeader>
        <CardContent>{isPending ? '...' : data.total}</CardContent>
      </Card>
    </>
  );
}

export default App;
