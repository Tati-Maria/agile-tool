import { useGetProjectQuery, useGetProjectActivityLogQuery } from "@/store/slices/project-api-slice"
import ProjectCard from "@/components/cards/project-card";
import { Loading } from "@/components/shared";
import { ActivityLog } from "@/types";


const ActivityList = ({projectId}: {projectId: string}) => {
    const { data: project, isLoading: isLoadingProject } = useGetProjectQuery(projectId);
    const { data: activityLog, isLoading: isLoadingActivity } = useGetProjectActivityLogQuery(projectId);

    if(!project || !activityLog) return null;
    console.log(activityLog)

  return (
    <section className="h-full py-5">
      {isLoadingProject && <Loading />}
      <ProjectCard project={project} />
      <ul 
      className="h-full overflow-y-auto mt-10"
      >
        {isLoadingActivity ? (<Loading />) : (
            activityLog?.map((activity: ActivityLog) => (
                <li 
                className="border-b py-2"
                key={activity._id}>
                    <p>
                        {activity.user.name} - {activity.details}
                    </p>
                </li>
            ))
        )}
      </ul>
    </section>
  );
}

export default ActivityList