import { CommentCard } from '@/components/cards/comment-card';
import { useCreateCommentMutation } from '@/store/slices/comment-api-slice';
import CommentForm, { CommentFormData } from '@/components/forms/comment-form';
import { Comment } from '@/types';
import { toast } from 'sonner';

interface CommentListProps {
    comments: Comment[];
    taskId: string;
}

const CommentList = ({taskId, comments}: CommentListProps) => {
    const [createComment] = useCreateCommentMutation();

    const handleSubmit = async (data: CommentFormData) => {
        try {
            const res = await createComment({
                taskId,
                content: data.content
            }).unwrap();
            toast.custom(t => (
              <div>
                <div className="font-bold">Comment created successfully</div>
                <div className="text-sm">{res.content}</div>
                <button onClick={() => toast.dismiss(t)}>Dismiss</button>
              </div>
            ));
        } catch (error) {
            const err = error as Error;
            console.log(err.message);
        }
    }


  return (
    <section>
        <CommentForm 
        onSubmit={handleSubmit}
        />
        <div className="mt-5">
            {comments.map((comment) => (
                <CommentCard
                key={comment._id}
                comment={comment} 
                />
            ))}
        </div>
    </section>
  )
}

export default CommentList