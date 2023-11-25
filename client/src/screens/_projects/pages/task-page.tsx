import { Link, useParams, useLocation } from 'react-router-dom';
import {
  useDeleteTaskMutation,
  useGetTaskByIdQuery,
} from '@/store/slices/task-api-slice';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

import { useSetDocumentTitle } from '@/hooks/user-document-title';
import {
  Heading,
  Loading,
  TooltipHover,
  Typography,
} from '@/components/shared';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useState } from 'react';
import DeleteModal from '@/components/modals/delete-modal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import { hasAccess } from '@/lib/utils';

const Task = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const location = useLocation();
  const { user } = useAuth();
  const [deletTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { data: task, isLoading } = useGetTaskByIdQuery(taskId as string, {
    skip: !taskId,
  });
  useSetDocumentTitle(`${task?.name}`);
  console.log(task);

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
        <Heading level={2}>
          {task?.name}
        </Heading>
        <article className="mt-5">
          {isLoading && <Loading />}
          <div className='flex-between'>
            <div className='space-y-3'>
              <Typography className="text-muted-foreground">
                {task?.description || 'No description'}
              </Typography>
              <div className='flex flex-row-reverse gap-2 items-center'>
                <Typography className="text-muted-foreground">
                  Assigned to {task?.assignedTo.name}
                </Typography>
                <Avatar>
                  <AvatarImage src={task?.assignedTo.avatar} alt="" />
                  <AvatarFallback>
                    {task?.assignedTo?.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className='flex flex-col space-y-2'>
              {hasAccess(user?.role) && (
                <TooltipHover variant='primary' text="Edit Task" asChild={true}>
                  <Link 
                  to={`${location.pathname}/update`}
                  >
                    <FaRegEdit className="text-2xl" />
                  </Link>
                </TooltipHover>
              )}
              {hasAccess(user?.role) && (
                <TooltipHover variant='destructive' text="Delete Task">
                  <FaRegTrashAlt
                    className="text-2xl"
                    onClick={() => setIsDeleteModalOpen(true)}
                  />
                </TooltipHover>
              )}
            </div>
          </div>
        </article>
        <article className='mt-5'>
          <div>
            <Heading level={3}>Comments ({task?.comments?.length})</Heading>
          </div>
          {/** //TODO */}
        </article>
      </section>
    </>
  );
};

export default Task;
