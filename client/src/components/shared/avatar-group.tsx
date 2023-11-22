import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { User } from '@/types';
import { Typography } from '.';
import { cn } from '@/lib/utils';

interface AvatarGroupProps {
  avatars: User[];
  max?: number;
}

const AvatarGroup = ({ avatars, max }: AvatarGroupProps) => {
  const avatarsToShow = max ? avatars.slice(0, max) : avatars;
  const hiddenAvatars = avatars.length - avatarsToShow.length;

  return (
    <>
      {avatars?.length === 0 ? (
        <Typography className="text-muted-foreground">No members</Typography>
      ) : (
        <div className="flex items-center -space-x-3">
          {avatarsToShow?.map(avatar => (
            <TooltipProvider key={avatar._id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className={cn('cursor-pointer ring-2 ring-muted')}>
                    <AvatarImage src={avatar.avatar} alt={avatar.name} />
                    <AvatarFallback>
                      {avatar.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <Typography>{avatar.name}</Typography>
                  <small>Role: {avatar.role}</small>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
          {hiddenAvatars > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="cursor-pointer ring-2 ring-muted">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback>+{hiddenAvatars}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <Typography>
                    {hiddenAvatars} more {hiddenAvatars > 1 ? 'members' : 'member'}
                  </Typography>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}
    </>
  );
};

export default AvatarGroup;
