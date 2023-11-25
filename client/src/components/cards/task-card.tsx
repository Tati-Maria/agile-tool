import { Typography, Heading } from '@/components/shared';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Task } from '@/types';
import {format} from 'date-fns';
import { GoComment } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {getTaskPriorityColor, getTaskStatus, cn} from "@/lib/utils";
import { FaArrowRight } from 'react-icons/fa6';

interface TaskCardProps {
  task: Task;

}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div
      className={cn(
        'flex-col-center space-y-2 relative p-2 bg-card',
        getTaskPriorityColor(task.priority)
      )}
    >
      <button
        className="absolute top-0 right-0 p-2 pr-3 hover:text-muted-foreground"
        aria-label="Task options"
      >
        <BsThreeDotsVertical size={18} />
      </button>
      <div className="space-y-1">
        <Typography
          className={cn(
            'text-xs w-max font-bold p-0.5 rounded mb-2',
            task.priority === 'Medium' && 'bg-yellow-200 text-yellow-800',
            task.priority === 'High' && 'text-red-800 bg-red-200',
            task.priority === 'Low' && 'text-green-800 bg-green-200'
          )}
        >
          {task.priority}
        </Typography>
        <Heading level={3}>{task.name}</Heading>
        <Typography>{task.description}</Typography>
      </div>
      <div className="flex-between">
        <div>
          <GoComment size={18} />
          <Typography className="text-sm">{task?.comments?.length}</Typography>
        </div>
        <div className="flex items-center flex-row-reverse gap-1">
          <Avatar className="h-5 w-5">
            <AvatarImage
              src={task.assignedTo.avatar}
              alt={task.assignedTo.name}
            />
            <AvatarFallback>
              {task.assignedTo.name.split(' ').map(n => n[0])}
            </AvatarFallback>
          </Avatar>
          <Typography className="text-xs">{task.assignedTo.name}</Typography>
        </div>
      </div>
      <div className='flex items-center space-x-1'>
        <Typography className={cn('text-xs w-max font-bold p-0.5 rounded')}>
          {format(new Date(task.createdAt), 'MMM dd, yyyy')}
        </Typography>
        <FaArrowRight className="font-normal" size={14} />
        <Typography className={cn('text-xs w-max font-bold p-0.5 rounded')}>
          {getTaskStatus(new Date(task.dueDate))}
        </Typography>
      </div>
    </div>
  );
};

export default TaskCard;
