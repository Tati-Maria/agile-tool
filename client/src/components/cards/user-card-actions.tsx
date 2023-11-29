import {
  User,
  ClipboardCopyIcon,
  ArrowBigRight,
  XCircle,
  Plus,
} from 'lucide-react';
import { Typography } from '@/components/shared';
import { useCopy } from '@/hooks/use-copy';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

interface UserCardActionsProps {
  email: string;
  role: string;
  userId: string;
  children: React.ReactNode;
}

const UserCardActions = ({
  email,
  userId,
  children,
}: UserCardActionsProps) => {
  const { isCopied, copyToClipboard } = useCopy(email);
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate(`/profile/${userId}`)}>
            <User className="mr-2 h-4 w-4" />
            <Typography>View Profile</Typography>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => copyToClipboard()}
            className={cn(isCopied && 'bg-green-500 text-white')}
          >
            <ClipboardCopyIcon className="mr-2 h-4 w-4" />
            <Typography>{isCopied ? 'Copied!' : 'Copy Email'}</Typography>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {user.role === 'Product Owner' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <DropdownMenuItem>
                  <ArrowBigRight className="mr-2 h-4 w-4" />
                  <Typography>Manage</Typography>
                </DropdownMenuItem>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Plus className="mr-2 h-4 w-4" />
                    <Typography>Assign Task</Typography>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <XCircle className="mr-2 h-4 w-4" />
                    <Typography>Remove User</Typography>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserCardActions;