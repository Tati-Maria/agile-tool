import { Heading, UserAvatar } from '@/components/shared';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { useGetUserQuery } from '@/store/slices/user-api-slice';
import { Link } from 'react-router-dom';
import { useDeleteAccount } from '@/hooks/use-delete-account';

const ProfilePage = () => {
  const { user } = useAuth();
  const { data: userDetail } = useGetUserQuery();
  const {handleDeleteAccount, isLoading} = useDeleteAccount();
  

  return (
    <section className="h-full grid place-items-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <UserAvatar
              avatarUrl={userDetail?.avatar as string}
              name={userDetail?.name as string}
            />
            <div className="flex flex-col space-y-1">
              <CardTitle>{userDetail?.name}</CardTitle>
              <CardDescription>{userDetail?.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-3">
            <Heading className="text-lg" level={3}>
              Account Details
            </Heading>
            <div className="flex flex-col space-y-1">
              <span>Role: {userDetail?.role}</span>
            </div>
          </div>
        </CardContent>
        {user?._id === userDetail?._id && (
          <CardFooter className="justify-end space-x-4">
            <Button asChild size={'sm'}>
              <Link to="/profile/update">Update Profile</Link>
            </Button>
            <Button 
            onClick={handleDeleteAccount}
            disabled={isLoading}
            size={'sm'} variant={'destructive'}>
              Delete Account 
            </Button>
          </CardFooter>
        )}
      </Card>
    </section>
  );
};

export default ProfilePage;
