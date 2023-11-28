import { Typography, Heading } from '@/components/shared';
import { TaskModal } from '@/components/modals/task-modal';

import { Task } from '@/types';
import {format} from 'date-fns';
import {cn} from '@/lib/utils';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;

}

const TaskCard = ({ task }: TaskCardProps) => {
    const [openModal, setOpenModal] = useState(false);

  return (
    <>
    {openModal && (
      <TaskModal 
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      taskId={task._id}
      />
    )}
      <div
      onClick={() => setOpenModal(true)}
        className={cn(
          'flex-col-center space-y-2 relative p-3 border border-white  shadow rounded-xl'
        )}
      >
        <div className="space-y-1">
          <Typography
            className={cn(
              'text-[11px] w-max font-semibold py-0.5 px-3 rounded mb-2 uppercase',
              task.priority === 'Urgent' && 'text-red-800 bg-red-200',
              task.priority === 'Normal' && 'bg-blue-200 text-blue-800',
              task.priority === 'High' && 'text-pink-800 bg-pink-200',
              task.priority === 'Low' && 'text-green-800 bg-green-200'
            )}
          >
            {task.priority}
          </Typography>
          <Heading 
          level={4} className="w-max hover:text-teal-500 cursor-pointer text-base">
            {task.name}
          </Heading>
          <Typography className="text-muted-foreground">
            {task.description}
          </Typography>
        </div>
        <div className="flex flex-col-reverse">
          <Typography className="text-muted-foreground mt-2">
            {task?.assignedTo?.name || 'Unassigned'}
          </Typography>
          <Typography className="text-[11px] border border-slate-200 w-max p-1 rounded-md">
            {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
