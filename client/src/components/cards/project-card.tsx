import { Project } from "@/types"
import { Heading, Typography, UserAvatar } from "@/components/shared";
import { GoGear } from 'react-icons/go';
import { LuShare2 } from 'react-icons/lu';
import { Link } from "react-router-dom";

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({project}: ProjectCardProps) => {
  return (
    <div className="flex flex-col space-y-2 border rounded-md w-max py-3 px-5">
      <Heading level={3}>{project?.name}</Heading>
      <Typography className="text-slate-600 truncate w-max">{project.description}</Typography>
      <div className="flex-between">
        <div className="flex-col flex space-y-1">
          <small className="text-muted-foreground uppercase text-[11px]">
            Project Owner
          </small>
          <div className="flex items-center space-x-1">
            <UserAvatar
            className="w-8 h-8"
              name={project.owner.name}
              avatarUrl={project.owner.avatar}
            />
            <Typography>{project.owner.name}</Typography>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link to={`/projects/${project._id}/settings`}>
            <GoGear size={20} />
          </Link>
          <LuShare2 size={20} />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard