import { Typography } from "@/components/shared";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    numberOfTasks?: number;
    text: string;
    subtext?: string;
}

const ProjectCard = ({ numberOfTasks, text, subtext}: ProjectCardProps) => {
  return (
    <div className={cn('border px-4 py-2 space-y-1 rounded-2xl', numberOfTasks === 50 && "bg-blue-700", numberOfTasks === 35 && "bg-muted")}>
      <Typography className="font-bold text-2xl md:text-3xl">
        {numberOfTasks}
      </Typography>
      <Typography>{text}</Typography>
      <small className="text-[11px]">{subtext}</small>
    </div>
  );
}

export default ProjectCard