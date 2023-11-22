import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { useUserLogout } from '@/hooks/user-logout';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

interface UserDropdownMenuProps {
  children: React.ReactNode;
  userId?: string;
}

const UserDropdownMenu = ({ children }: UserDropdownMenuProps) => {
  const { isLoading, logout } = useUserLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='hover:bg-transparent hover:shadow-md'>{children}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icons.user className="w-4 h-4 mr-2" />
          <Link to={`/profile`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer' onClick={() => logout()} disabled={isLoading}>
          <Icons.logout className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
