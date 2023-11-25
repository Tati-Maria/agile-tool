import { CommentCard } from '@/components/cards/comment-card';
import CommentForm from '@/components/forms/comment-form';
import { Comment } from '@/types';
import React, {useState} from 'react';

interface CommentListProps {
    comments: Comment[];
    taskId: string;
}

const CommentList = ({taskId, comments}: CommentListProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    }

  return (
    <section>
        <CommentForm 
        onSubmit={() => {}}
        isEditing={isEditing}
        initialValues={{text: ""}}
        />
        <div className="mt-5">
            {comments.map((comment) => (
                <CommentCard
                key={comment._id}
                comment={comment} 
                handleEdit={handleEdit}
                />
            ))}
        </div>
    </section>
  )
}

export default CommentList