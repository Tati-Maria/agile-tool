import { Loading, Typography } from "@/components/shared";
import AvatarGroup from "@/components/shared/avatar-group";
import EmptyState from "@/components/shared/empty-state";
import ProjectIntro from "@/components/shared/project-intro";
import { useGetProjectQuery } from "@/store/slices/project-api-slice"
import { format } from "date-fns";
import { useParams } from "react-router-dom"

const ProjectPage = () => {
  const {projectId} = useParams<{projectId: string}>()
  const {data: project, isLoading} = useGetProjectQuery(projectId, {skip: !projectId});

  if(isLoading) {
    return (
      <Loading />
    )
  } else if(!isLoading && !project) {
    return (
      <EmptyState text="Project not found" />
    )
  } else if(!projectId) {
    return (
      <EmptyState text="Please select a project" />
    )
  }

  return (
    <section className="min-h-screen space-y-6">
      <div className="flex-between">
        <span className="text-slate-500 text-xs">
          Last updated <span className="text-violet-500 font-medium">{format(new Date(project.updatedAt), 'PPP')}</span>
        </span>
        <div className="flex flex-col space-y-1 text-right text-xs">
          <span className="text-muted-foreground">Created On</span>
          <span>{format(new Date(project.createdAt), 'PPP')}</span>
        </div>
      </div>
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between">
        <ProjectIntro
          avatar={project.logo}
          name={project.name}
          isActive={project.isActive}
          startDate={project.startDate}
          endDate={project.endDate}
          projectId={projectId}
        />
        <AvatarGroup avatars={project.team} max={5} />
      </div>
      <Typography>{project.description}</Typography>
    </section>
  );
}

export default ProjectPage