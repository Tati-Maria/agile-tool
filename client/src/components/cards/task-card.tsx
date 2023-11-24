import { Task } from "@/types";
import { Typography, Heading } from "@/components/shared";
import { GoComment } from 'react-icons/go';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TaskCardProps {
    task: Task;
}

const TaskCard = ({task}: TaskCardProps) => {
  return (
    <li className="flex-col-center space-y-2">
        <div className="space-y-1">
            <Heading level={4}>
                {task.name}
            </Heading>
            <Typography>
                {task.description}
            </Typography>
        </div>
        <Avatar>
            <AvatarImage src={task.assignedTo.avatar} alt={task.assignedTo.name} />
            <AvatarFallback>
                {task.assignedTo.name.split(' ').map(n => n[0])}
            </AvatarFallback>
        </Avatar>
        <div className="flex-center space-x-4">
            <Typography className="text-xs">
                <GoComment className="inline-block mr-1" />
                {task.comments.length}
            </Typography>
            <Typography>
                {task.status}
            </Typography>
            <Typography>
                {task.priority}
            </Typography>
        </div>
    </li>
  )
}

export default TaskCard