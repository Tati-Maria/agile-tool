import { Comment } from '@/types';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Typography } from '../shared';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface CommentCardProps {
  comment: Comment;
  handleEdit: () => void;
}

export const CommentCard = ({ comment, handleEdit }: CommentCardProps) => {
  const { user } = useAuth();
  const isOwner = user?._id === comment.author._id;

  return (
    <div>
      <div
        className={cn(
          'flex items-center space-x-2',
          isOwner ? 'justify-end' : 'justify-start'
        )}
      >
        <div>
          <Avatar>
            <AvatarImage
              src={comment.author.avatar}
              alt={comment.author.name}
            />
            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <Typography className="text-sm">{comment.author.name}</Typography>
        <Typography className="text-muted-foreground text-xs">
          {comment.createdAt}
        </Typography>
      </div>
      <div className="mt-2">
        <Typography>{comment.text}</Typography>
      </div>
      {isOwner && (
        <div className="flex justify-end mt-2">
          <Button
            variant={'outline'}
            className="text-muted-foreground hover:text-muted-foreground"
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            variant={'destructive'}
            className="text-muted-foreground hover:text-muted-foreground"
            onClick={() => console.log('delete')}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
