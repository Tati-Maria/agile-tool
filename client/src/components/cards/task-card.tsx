import { Typography, Heading } from '@/components/shared';

import { Task } from '@/types';
import {format} from 'date-fns';
import { Link, useLocation } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {cn} from '@/lib/utils';

interface TaskCardProps {
  task: Task;

}

const TaskCard = ({ task }: TaskCardProps) => {
    const location = useLocation();

  return (
    <div
      className={cn(
        'flex-col-center space-y-2 relative p-3 border  shadow rounded-xl',)}
    >
      <button
        className="absolute top-0 right-0 p-2 hover:text-muted-foreground"
        aria-label="Task options"
      >
        <BsThreeDotsVertical size={18} />
      </button>
      <div className="space-y-1">
        <Typography
          className={cn(
            'text-[10px] w-max font-semibold p-0.5 rounded mb-2 uppercase',
            task.priority === 'Urgent' && 'text-red-800 bg-red-200',
            task.priority === 'Normal' && 'bg-blue-200 text-blue-800',
            task.priority === 'High' && 'text-orange-800 bg-orange-200',
            task.priority === 'Low' && 'text-green-800 bg-green-200'
          )}
        >
          {task.priority}
        </Typography>
        <Heading level={4} className="w-max text-base">
          <Link to={`${location.pathname}/${task._id}`}>{task.name}</Link>
        </Heading>
        <Typography className='text-muted-foreground'>{task.description}</Typography>
      </div>
      <div className='flex flex-col-reverse'>
        <Typography className="text-muted-foreground mt-2">
          {task.assignedTo.name}
        </Typography>
        <Typography className="text-[11px] border w-max p-1 rounded-md bg-muted-foreground text-muted">
          {format(new Date(task.dueDate), 'MMM dd, yyyy')}
        </Typography>
      </div>
    </div>
  );
};

export default TaskCard;
