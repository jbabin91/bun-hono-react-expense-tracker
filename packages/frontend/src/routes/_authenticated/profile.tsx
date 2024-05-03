import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { userQueryOptions } from '@/libs/api';

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) return 'Loading...';
  if (error) return 'not logged in';

  return (
    <Card className="mx-auto w-[350px]">
      <CardHeader>
        <CardTitle>
          <Avatar>
            {data?.user.picture ? (
              <AvatarImage alt={data.user.given_name} src={data.user.picture} />
            ) : null}
            <AvatarFallback>
              {data?.user.given_name[0]}
              {data?.user.family_name[0]}
            </AvatarFallback>
          </Avatar>
        </CardTitle>
        <CardDescription>Hello from Profile!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          Hello {data?.user.given_name} {data?.user.family_name}
        </p>
        <Button asChild>
          <a href="/api/logout">Logout</a>
        </Button>
      </CardContent>
    </Card>
  );
}
