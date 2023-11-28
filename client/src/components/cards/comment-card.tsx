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
import { RiDeleteBinLine } from 'react-icons/ri';
import { TiPen } from 'react-icons/ti';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { format } from 'date-fns';

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
        id: comment._id,
        body: {
          content,
        }
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
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className=''>
          <Typography className="text-sm">{comment.author.name}</Typography>
          <Typography className="text-muted-foreground text-xs">
            {format(new Date(comment.createdAt), 'dd MMM yyyy hh:mm a')}
          </Typography>
        </div>
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
        <div className="flex justify-end mt-2 items-center space-x-3">
          <Button
            variant={'primary'}
            className="text-muted-foreground hover:text-muted-foreground"
            onClick={() => {
              if (isEditing) {
                handleUpdateComment();
              }
              setIsEditing(!isEditing);
            }}
          >
            {isEditing ? (
              <Typography className="text-xs">Save</Typography>
            ) : (
              <TiPen size={18} />
            )}
          </Button>
          <Button
            variant={'destructive'}
            disabled={isUpdating || isDeleting}
            className="text-muted-foreground hover:text-muted-foreground"
            onClick={() => {
              toast.custom((t) => (
                <div
                  className="flex flex-col space-y-2 p-2 bg-card border rounded-md shadow-md"
                  style={{ minWidth: '300px' }}
                >
                  <p>
                    Are you sure you want to delete this comment? This action
                    cannot be undone.
                  </p>
                  <div className="flex justify-end items-center space-x-4">
                    <Button
                    onClick={() => toast.dismiss(t)}
                    size={"sm"}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant={'destructive'}
                      size={"sm"}
                      onClick={() => {
                        handleDeleteComment();
                        toast.dismiss(t);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ), {
                duration: 10000,
              })
            }}
          >
            <RiDeleteBinLine size={18} />
          </Button>
        </div>
      )}
    </div>
  );
};
