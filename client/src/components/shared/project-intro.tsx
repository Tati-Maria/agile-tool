import { Avatar,  AvatarImage } from "@/components/ui/avatar";
import { Heading, Typography } from ".";
import { formatDateRange } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from "../ui/button";


interface ProjectIntroProps {
    avatar: string;
    name: string;
    startDate: string;
    endDate: string;
    projectId: string;
    desc?: string;
    accessCode?: string;
}

const ProjectIntro = ({avatar, name, startDate, endDate, projectId, desc, accessCode}: ProjectIntroProps) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="space-y-1">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button className="text-xl md:text-2xl" variant={'link'}>{name}</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar className="h-16 w-16 bg-muted">
                <AvatarImage src={avatar || '/images/project-placeholder'} />
              </Avatar>
              <div className="space-y-1">
                <Heading level={3}>{name}</Heading>
                <Typography className="text-xs text-muted-foreground">
                  {formatDateRange(new Date(startDate), new Date(endDate))}
                </Typography>
                <Typography>
                  {desc || 'No description provided'}
                </Typography>
                <div>
                  <Button asChild variant={'link'} className="text-xs" size={'sm'}>
                    <Link to={`/projects/${projectId}/update`}>Edit</Link>
                  </Button>
                  <Typography>
                    Access Code: {accessCode}
                  </Typography>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}

export default ProjectIntro