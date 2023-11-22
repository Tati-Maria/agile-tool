import { Avatar,  AvatarImage } from "@/components/ui/avatar";
import { Heading, Typography } from ".";
import { formatDateRange } from "@/lib/utils";

interface ProjectIntroProps {
    avatar: string;
    name: string;
    isActive: boolean;
    startDate: string;
    endDate: string;
}

const ProjectIntro = ({avatar, name, startDate, endDate}: ProjectIntroProps) => {
  return (
    <div className="flex items-center space-x-3">
      <Avatar className="h-16 w-16 bg-muted">
        <AvatarImage src={avatar || '/images/project-placeholder'} />
      </Avatar>
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