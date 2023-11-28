import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
    <Avatar className={cn(className)} {...rest}>
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback>
        {name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
