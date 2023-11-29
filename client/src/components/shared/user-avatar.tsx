import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';

interface UserAvatarProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  avatarUrl: string;
}

const UserAvatar = ({
  name,
  avatarUrl,
  className,
  ...rest
}: UserAvatarProps) => {
  return (
    <Link to="/profile">
      <Avatar className={cn(className, 'rounded-full')} {...rest}>
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
