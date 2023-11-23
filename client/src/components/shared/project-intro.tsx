import { Avatar,  AvatarImage } from "@/components/ui/avatar";
import { Actions, Heading, Typography } from ".";
import { formatDateRange } from "@/lib/utils";

interface ProjectIntroProps {
    avatar: string;
    name: string;
    isActive: boolean;
    startDate: string;
    endDate: string;
    projectId: string;
}

const ProjectIntro = ({avatar, name, startDate, endDate, projectId}: ProjectIntroProps) => {
  return (
    <div className="flex items-center space-x-3">
      <div
      className="flex space-x-1 items-start"
      >
        <Actions
        route={`/projects/${projectId}`}
        />
        <Avatar className="h-16 w-16 bg-muted">
          <AvatarImage src={avatar || '/images/project-placeholder'} />
        </Avatar>
      </div>
      <div className="space-y-1">
        <Heading level={3} className="mb-1">
          {name}
        </Heading>
        <Typography className="text-xs text-muted-foreground">
          {formatDateRange(new Date(startDate), new Date(endDate))}
        </Typography>
      </div>
    </div>
  );
}

export default ProjectIntro