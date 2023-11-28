import { useGetProjectQuery, useGetProjectActivityLogQuery } from "@/store/slices/project-api-slice"
import ProjectCard from "@/components/cards/project-card";
import { Loading } from "@/components/shared";
import { ActivityLog } from "@/types";


const ActivityList = ({projectId}: {projectId: string}) => {
    const { data: project, isLoading: isLoadingProject } = useGetProjectQuery(projectId);
    const { data: activityLog, isLoading: isLoadingActivity } = useGetProjectActivityLogQuery(projectId);

    if(!project || !activityLog) return null;

  return (
    <section className="h-full py-5">
      {isLoadingProject && <Loading />}
      <ProjectCard project={project} />
      <ul>
        {isLoadingActivity ? (<Loading />) : (
            activityLog?.map((activity: ActivityLog) => (
                <li key={activity._id}>
                    {activity.details}
                </li>
            ))
        )}
      </ul>
    </section>
  );
}

export default ActivityList