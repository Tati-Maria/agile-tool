import { Sprint, Task } from "@/types";
import { cn, getTaskPriorityColor, taskStatusColor } from "@/lib/utils";
import { Heading } from "../shared";
import { Link } from "react-router-dom";

interface TaskSprintCardProps {
    task: Task;
    sprint: Sprint
}

const TaskSprintCArd = ({task, sprint}: TaskSprintCardProps) => {
  return (
    <li className={cn(getTaskPriorityColor(task.priority), "flex p-2 border-y border-r border-r-muted border-y-muted flex-col space-y-2")}>
      <Heading level={4} className="w-max">
        <Link 
        to={`/projects/${sprint.project._id}/tasks/${task._id}`}
        >{task.name}</Link>
      </Heading>
      <div className="flex-between">
        <div className={cn(taskStatusColor(task.status), "text-xs p-0.5 rounded-sm")}>
          <span>{task.status}</span>
        </div>
        <img 
        className="w-6 h-6 rounded-full"
        src={task.assignedTo.avatar} alt={task.assignedTo.name} />
      </div>
    </li>
  );
}

export default TaskSprintCArd