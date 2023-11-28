import { Sprint, Task } from '@/types';
import { cn, getTaskPriorityColor, taskStatusColor } from '@/lib/utils';
import {
  Heading,
  RemoveTask,
  UserAvatar,
} from '@/components/shared';
import { Link } from 'react-router-dom';

interface TaskSprintCardProps {
  task: Task;
  sprint: Sprint;
}

const TaskSprintCArd = ({ task, sprint }: TaskSprintCardProps) => {
  return (
    <li
      className={cn(
        getTaskPriorityColor(task.priority),
        'flex p-2 border-y border-r group border-r-muted border-y-muted flex-col space-y-2 relative'
      )}
    >
      <RemoveTask
        className="transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        taskId={task._id}
        sprintId={sprint._id}
      />
      <Heading level={4} className="w-max">
        <Link to={`/projects/${sprint.project._id}/tasks/${task._id}`}>
          {task.name}
        </Link>
      </Heading>
      <div className="flex-between">
        <div
          className={cn(
            taskStatusColor(task.status),
            'text-xs p-0.5 rounded-sm'
          )}
        >
          <span>{task.status}</span>
        </div>
        <UserAvatar
          avatarUrl={task.assignedTo.avatar}
          name={task.assignedTo.name}
          className="w-6 h-6"
        />
      </div>
    </li>
  );
};

export default TaskSprintCArd;
