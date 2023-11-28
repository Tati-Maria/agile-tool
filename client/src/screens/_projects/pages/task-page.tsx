import { Link, useParams} from 'react-router-dom';
import {
  useDeleteTaskMutation,
  useGetTaskByIdQuery,
} from '@/store/slices/task-api-slice';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

import { useSetDocumentTitle } from '@/hooks/user-document-title';
import {
  EmptyState,
  Heading,
  Loading,
  TooltipHover,
  Typography,
  UserAvatar,
} from '@/components/shared';

import { useState } from 'react';
import DeleteModal from '@/components/modals/delete-modal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import { hasAccess } from '@/lib/utils';
import CommentForm from '@/components/forms/comment-form';
import { CommentCard } from '@/components/cards/comment-card';
import { useGetTaskCommentsQuery } from '@/store/slices/comment-api-slice';
import { Comment } from '@/types';

const Task = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const { user } = useAuth();
  const [deletTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { data: task, isLoading } = useGetTaskByIdQuery(taskId as string, {
    skip: !taskId,
  });
  const {data: comments, isLoading: isCommentsLoading} = useGetTaskCommentsQuery(taskId as string, {
    skip: !taskId
  });

  console.log(comments);
  useSetDocumentTitle(`${task?.name}`);

  async function handleDeleteTask() {
    try {
      const res = await deletTask(taskId as string).unwrap();
      toast.success(res.message);
      navigate(`/projects/${task?.sprint.project._id}`);
    } catch (error) {
      const err = error as { message: string };
      toast.error(err.message);
    }
  }

  return (
    <>
      {isDeleteModalOpen && (
        <DeleteModal
          title="Delete Task"
          description="Are you sure you want to delete this task?"
          isOpen={isDeleteModalOpen}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteTask}
          isLoading={isDeleting}
        />
      )}
      <section className="h-full py-5">
        {isLoading && <Loading />}
        <Heading className="text-xl md:text-2xl" level={2}>
          {task?.name}
        </Heading>
        <Typography className="text-sm text-muted-foreground my-2">
          {task?.description}
        </Typography>
        <div className="flex items-center space-x-3 mt-3">
          <Typography className="border py-1 px-4 rounded-full">
            Status: {task?.status}
          </Typography>
          <Typography className="border py-1 px-4 rounded-full">
            Type: {task?.type}
          </Typography>
          <Typography className="border py-1 px-4 rounded-full">
            Priority: {task?.priority}
          </Typography>
          {hasAccess(user.role) && (
            <div className='flex items-center space-x-3'>
              <Link to={`/projects/${task?.project}/tasks/${task?._id}/update`}>
                <FaRegEdit />
              </Link>
              <TooltipHover
              variant='destructive'
              text='Delete Task'
              >
                <FaRegTrashAlt onClick={() => setIsDeleteModalOpen(true)} />
              </TooltipHover>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-6 mt-3">
          <div className="space-y-2 text-sm">
            <span className="text-muted-foreground">Created By</span>
            <div className="flex items-center space-x-2">
              <UserAvatar
                name={task?.createdBy?.name as string}
                avatarUrl={task?.createdBy?.avatar as string}
              />
              <Typography className="font-bold">
                {task?.createdBy?.name}
              </Typography>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <span className="text-muted-foreground">Assigned To</span>
            <div className="flex items-center space-x-2">
              <UserAvatar
                name={task?.assignedTo?.name as string}
                avatarUrl={task?.assignedTo?.avatar as string}
              />
              <Typography className="font-bold">
                {task?.assignedTo?.name}
              </Typography>
            </div>
          </div>
        </div>
        <div className='text-gray-500 italic my-4'>
          {task?.tags?.map(tag => (
            <Typography
              className="text-xs inline-block mr-1"
              key={tag}
            >
              #{tag}
            </Typography>
          ))}
        </div>
        <article className="mt-5">
          <div>
            <Heading level={3}>Comments ({comments?.length})</Heading>
          </div>
          <div className="mt-5">
            <CommentForm  taskId={taskId as string}/>
            <div className='mt-6 flex-col flex space-y-5'>
              {isCommentsLoading && <Loading />}
              {comments?.length === 0 && (<EmptyState text="No comments yet" />)}
              {comments?.map((comment: Comment) => (
                <CommentCard key={comment._id} comment={comment} />
              ))}
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default Task;
