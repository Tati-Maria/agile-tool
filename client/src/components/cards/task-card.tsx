import { Typography, Heading } from '@/components/shared';

import { Task } from '@/types';
import {format} from 'date-fns';
import {cn, getTaskPriorityTextColor} from '@/lib/utils';
import { Link } from 'react-router-dom';

interface TaskCardProps {
  task: Task;

}

const TaskCard = ({ task }: TaskCardProps) => {

  return (
    <>
      <div
        className={cn(
          'flex-col-center space-y-2 relative p-3 border border-white  shadow rounded-xl'
        )}
      >
        <div className="space-y-1">
          <Typography
            className={cn(
              'text-[11px] w-max font-semibold py-0.5 px-3 rounded mb-2 uppercase',getTaskPriorityTextColor(task.priority))}
          >
            {task.priority}
          </Typography>
          <Heading level={4} className="w-max hover:text-teal-500 cursor-pointer text-base">
            <Link to={`/projects/${task.project}/tasks/${task._id}`}>
              {task.name}
            </Link>
          </Heading>
          <Typography className="text-muted-foreground">
            {task.description}
          </Typography>
        </div>
        <div className="flex flex-col-reverse">
          <Typography className="text-muted-foreground mt-2">
            Assigned To: {task?.assignedTo?.name || 'Unassigned'}
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
