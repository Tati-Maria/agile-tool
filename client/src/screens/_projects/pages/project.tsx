import UserCard from "@/components/cards/user-card";
import ProjectCard from "@/components/project-table/project-card";
import ProjectProgress from "@/components/project-table/project-progress";
import { Heading, Loading, Typography } from "@/components/shared";
import EmptyState from "@/components/shared/empty-state";
import ProjectIntro from "@/components/shared/project-intro";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetProjectQuery } from "@/store/slices/project-api-slice"
import { User } from "@/types";
import { format } from "date-fns";
import { Link, useParams } from "react-router-dom"

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
    <section className="min-h-screen space-y-10">
      <div className="flex-between">
        <span className="text-slate-500 text-xs">
          Last updated{' '}
          <span className="text-violet-500 font-medium">
            {format(new Date(project.updatedAt), 'PPP')}
          </span>
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
          startDate={project.startDate}
          endDate={project.endDate}
          projectId={projectId}
          desc={project.description}
          accessCode={project.accessCode}
        />
      </div>
      <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="grid grid-cols-2 gap-8">
          <ProjectCard
            text="Total Tasks"
            subtext="+2 this week"
            numberOfTasks={50}
          />
          <ProjectCard
            text="Completed Tasks"
            subtext="+1 this week"
            numberOfTasks={12}
          />
          <ProjectCard
            text="Overdue Tasks"
            subtext="+1 this week"
            numberOfTasks={3}
          />
          <ProjectCard
            text="To Do Tasks"
            subtext="+12 this week"
            numberOfTasks={35}
          />
        </div>
        <div className=" bg-[#58ea81] flex flex-col justify-around rounded-2xl px-8 py-3 text-black">
          <Typography className="font-extrabold max-w-xs text-4xl">
            Get <span className="text-violet-800">Premium+</span> to manage more
            than 100 projects
          </Typography>
          <Typography>
            <Link to="#" className="font-semibold uppercase text-xs">
              Learn more &rarr;
            </Link>
          </Typography>
        </div>
        <div>
          <ProjectProgress projectId={projectId} />
        </div>
      </article>
      <div className="py-5">
        <div className="flex-between">
          <Heading className="text-xl md:text-2xl" level={2}>
            Team Members
          </Heading>
          <Link
            to={`/projects/${projectId}/team`}
            className="link-text dark:hover:text-violet-500"
          >
            See all
          </Link>
        </div>
        <ScrollArea className="mt-5 h-auto overflow-x-auto">
          <div className="grid grid-flow-col space-x-3">
            {project.team.length > 0 ? (
              project.team.slice(0,6).map((member: User) => (
                <UserCard key={member._id} user={member} />
              ))
            ) : (
              <EmptyState text="No team members" />
            )}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
}

export default ProjectPage