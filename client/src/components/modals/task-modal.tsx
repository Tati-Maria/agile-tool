import { Typography, UserAvatar } from '@/components/shared';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/modals/modal';
import { CiCalendar } from 'react-icons/ci';
import { getTaskStatus, getTaskPriorityTextColor, taskStatusColor } from '@/lib/utils';
import { useGetTaskByIdQuery } from '@/store/slices/task-api-slice';
import { format } from 'date-fns';

//icons
import { TbUrgent } from 'react-icons/tb';
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from 'react-icons/fc';

interface TaskModalProps {
  onClose: () => void;
  isOpen: boolean;
  taskId: string;
}

export const TaskModal = ({ onClose, isOpen, taskId }: TaskModalProps) => {
  const { data: task, isLoading } = useGetTaskByIdQuery(taskId, { skip: !taskId });

    if (isLoading) return null;
    if(!task) return <Modal title="Task not found" isOpen={isOpen} onClose={onClose} description="Task not found" />

  return (
    <Modal
      title={task?.name as string}
      isOpen={isOpen}
      onClose={onClose}
      description={task?.description as string}
    >
      <div className="flex space-x-7">
        <div className="flex flex-grow flex-col space-y-4">
          <div>
            <span className="text-sm mb-1 inline-block">Status</span>
            <div
              className={cn(
                'w-max px-2 rounded-full',
                taskStatusColor(task?.status)
              )}
            >
              <Typography className="w-max">{task?.status}</Typography>
            </div>
          </div>
          {/* Type */}
          <div>
            <span className="text-sm">Type</span>
            <div>
              <Typography>{task?.type}</Typography>
            </div>
          </div>
          <div>
            {task.comments.length === 0 ? (
              <em>No comments yet</em>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div>
          {/* CreatedBy */}
          <div className="space-y-2 border-b py-3">
            <span className="text-sm">Created by</span>
            <div className="flex flex-row items-center space-x-2">
              <UserAvatar
                className="h-6 w-6"
                name={task?.createdBy?.name as string}
                avatarUrl={task?.createdBy?.avatar as string}
              />
              <Typography className="font-bold">
                {task?.createdBy?.name}
              </Typography>
            </div>
          </div>
          {/* AssignedTo */}
          <div className="space-y-2 border-b py-3">
            <span className="text-sm">Assigned to</span>
            <div className="flex flex-row items-center space-x-2">
              <UserAvatar
                className="h-6 w-6"
                name={task?.assignedTo?.name as string}
                avatarUrl={task?.assignedTo?.avatar as string}
              />
              <Typography className="font-semibold">
                {task?.assignedTo?.name}
              </Typography>
            </div>
          </div>
          {/* Due Date */}
          <div className="border-b space-y-2 py-3">
            <span className="text-sm">Due Date</span>
            <div className="flex flex-row space-x-2 items-center">
              <CiCalendar className="h-5 w-5" />
              <Typography className="text-xs">
                {getTaskStatus(new Date(task?.dueDate as string))}
              </Typography>
            </div>
          </div>
          {/* Priority */}
          <div className="py-3 border-b space-y-2">
            <span className="text-sm">Priority</span>
            {task?.priority === 'Urgent' && (
              <div className="flex items-center space-x-3">
                <TbUrgent
                  className={cn(getTaskPriorityTextColor(task?.priority))}
                  size={20}
                />
                <Typography
                  className={cn(getTaskPriorityTextColor(task?.priority))}
                >
                  Urgent
                </Typography>
              </div>
            )}
            {task?.priority === 'High' && (
              <div className="flex items-center space-x-1">
                <FcHighPriority size={20} />
                <Typography
                  className={cn(getTaskPriorityTextColor(task?.priority))}
                >
                  High
                </Typography>
              </div>
            )}
            {task?.priority === 'Normal' && (
              <div className="flex items-center space-x-1">
                <FcMediumPriority size={20} />
                <Typography
                  className={cn(getTaskPriorityTextColor(task?.priority))}
                >
                  Medium
                </Typography>
              </div>
            )}
            {task?.priority === 'Low' && (
              <div className="flex items-center space-x-1">
                <FcLowPriority
                  size={20}
                  className={cn(getTaskPriorityTextColor(task?.priority))}
                />
                <Typography
                  className={cn(getTaskPriorityTextColor(task?.priority))}
                >
                  Low
                </Typography>
              </div>
            )}
          </div>
          {/* Tags */}
          <div className="flex flex-col space-y-1 py-3 border-b">
            <span className="font-semibold text-sm mb-2">Tags</span>
            <div className="text-xs  space-x-3">
              {task?.tags.map((tag, i) => (
                <span className="border p-0.5 rounded-full" key={i}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {/* Task upated */}
          <div className="flex flex-col space-y-2 py-3">
            <div className="flex flex-col space-y-1">
              <span className="font-semibold text-sm">Created</span>
              <Typography className="text-xs text-muted-foreground">
                {format(new Date(task?.createdAt as string), 'PPP')}
              </Typography>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-semibold text-sm">Updated</span>
              <Typography className="text-xs text-muted-foreground">
                {format(new Date(task?.updatedAt as string), 'PPP')}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
