import { Comment } from '@/types';
import { Textarea } from '@/components/ui/textarea';
import {
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from '@/store/slices/comment-api-slice';
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Typography } from '@/components/shared';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CommentCardProps {
  comment: Comment;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  const { user } = useAuth();
  const isOwner = user?._id === comment.author._id;
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [updateComment, { isLoading: isUpdating }] = useUpdateCommentMutation();
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  const handleUpdateComment = async () => {
    try {
      const res = await updateComment({
        commentId: comment._id,
        content,
      }).unwrap();
      console.log(res);
      setIsEditing(false);
      toast.success('Comment updated successfully');
    } catch (error) {
      const err = error as Error;
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const res = await deleteComment(comment._id);
      console.log(res);
      toast.success('Comment deleted successfully');
    } catch (error) {
      const err = error as Error;
      console.log(err.message);
      toast.error(err.message);
    }
  };

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
        {isEditing ? (
          <Textarea
            rows={3}
            className="w-full"
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={isUpdating || isDeleting}
            minLength={1}
            maxLength={500}
          />
        ) : (
          <Typography className="text-muted-foreground">
            {comment.content}
          </Typography>
        )}
      </div>
      {isOwner && (
        <div className="flex justify-end mt-2">
          <Button
            variant={'outline'}
            className="text-muted-foreground hover:text-muted-foreground"
            onClick={() => {
              if (isEditing) {
                handleUpdateComment();
              }
              setIsEditing(!isEditing);
            }}
          >
            Edit
          </Button>
          <Button
            variant={'destructive'}
            disabled={isUpdating || isDeleting}
            className="text-muted-foreground hover:text-muted-foreground"
            onClick={() => {
              toast.warning('Are you sure you want to delete this comment?', {
                action: {
                  label: 'Yes',
                  onClick: () => {
                    handleDeleteComment();
                  },
                },
              });
            }}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
