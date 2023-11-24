import { useAuth } from '@/hooks/use-auth';
import { Loading } from '@/components/shared';
import { useGetProjectsQuery } from '@/store/slices/project-api-slice';
import { Project } from '@/types';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ProjectRowActions from '@/components/project-table/actions';
import { cn } from '@/lib/utils';

const ProjectList = () => {
  const { user } = useAuth();
  const { data, isLoading } = useGetProjectsQuery();

  const currentUserProjects = data?.filter(
    project => project.team?.map(member => member._id).includes(user?._id)
  );

  const formattedProjects = currentUserProjects?.map(project => {
    const formattedProject: Project = {
      ...project,
      team: project.team?.map(member => ({
        ...member,
        name: `${member.name} ${member.role}`,
      })),
    };
    return formattedProject;
  });

  return (
    <section className="h-full">
      {isLoading && <Loading />}
      <Table>
        <TableCaption>Projects</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="dark:text-blue-100 text-blue-800">
              Name
            </TableHead>
            <TableHead className=" dark:text-blue-100 text-blue-800">
              Active
            </TableHead>
            <TableHead className="dark:text-blue-100 text-blue-800">
              Start Date
            </TableHead>
            <TableHead className="dark:text-blue-100 text-blue-800">
              End Date
            </TableHead>
            <TableHead className="dark:text-blue-100 text-blue-800">
              Owner
            </TableHead>
            <TableHead className="dark:text-blue-100 text-blue-800">
              Team
            </TableHead>
            <TableHead className="dark:text-blue-100 text-blue-800">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formattedProjects?.length ? (
            <>
              {formattedProjects.map(project => (
                <TableRow key={project._id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell className={cn("text-center uppercase font-bold", !project.isActive ? "text-gray-800 bg-gray-200/70" : "text-green-800 bg-green-200/70")}>
                    {project.isActive ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell>
                    {format(new Date(project.startDate), 'dd/MM/yy')}
                  </TableCell>
                  <TableCell>
                    {format(new Date(project.endDate), 'dd/MM/yy')}
                  </TableCell>
                  <TableCell>{project.owner?.name}</TableCell>
                  <TableCell>{project.team?.length}</TableCell>
                  <TableCell>
                    <ProjectRowActions isActive={project.isActive} data={project._id} />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={8}>No projects found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default ProjectList;
