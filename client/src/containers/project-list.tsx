import { useAuth } from '@/hooks/use-auth';
import { Loading } from '@/components/shared';
import { useGetProjectsQuery } from '@/store/slices/project-api-slice';

import { ProjectTable, ProjectColumn } from '@/components/project-table';
import { Project } from '@/components/project-table/columns';

const ProjectList = () => {
  const { user } = useAuth();
  const { data, isLoading } = useGetProjectsQuery();

  const currentUserProjects = data?.filter(
    project => project.team?.map(member => member._id).includes(user?._id)
  );

  const formattedProjects: Project[] = currentUserProjects?.map(project => ({
    name: project.name,
    isActive: project.isActive,
    startDate: project.startDate,
    endDate: project.endDate,
    owner: project.owner.name,
    progress: 0,
    id: project._id,
  })) as Project[];

  return (
    <section className="h-full">
      {isLoading && <Loading />}
      <ProjectTable data={formattedProjects} columns={ProjectColumn} />
    </section>
  );
};

export default ProjectList;
