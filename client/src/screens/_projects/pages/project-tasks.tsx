import { Heading, Loading, EmptyState, Typography } from '@/components/shared';
import { useParams, useNavigate } from 'react-router-dom';
import TaskList from '@/containers/task-list';
import { useSetDocumentTitle } from '@/hooks/user-document-title';
import { SideModal } from '@/components/modals/side-modal';
import { Button } from '@/components/ui/button';
import { useGetTasksQuery, useCreateTaskMutation } from '@/store/slices/task-api-slice';
import { TaskForm } from '@/components/forms/task-form';
import { Task } from '@/lib/validation/task';
import { toast } from 'sonner';
import { useGetProjectQuery } from '@/store/slices/project-api-slice';

const convertStringToArr = (str: string) => {
  return str.split(',').map((item) => item.trim());
}

const ProjectTasksPage = () => {
    useSetDocumentTitle('Project Tasks');
    const { projectId } = useParams<{ projectId: string }>();
    const { data: project } = useGetProjectQuery(projectId as string);
    const {data: tasks, isLoading} = useGetTasksQuery(projectId as string)
    const navigate = useNavigate();
    const [createTask] = useCreateTaskMutation();
    const team = project?.team;

    //handle create task
    const handleCreateTask = async (values: Task) => {
      try {
        const res = await createTask({
          projectId: projectId as string,
          name: values.name,
          description: values.description,
          assignedTo: values.assignedTo,
          priority: values.priority,
          dueDate: values.dueDate,
          status: values.status,
          type: values.type,
          tags: values.tags ? convertStringToArr(values.tags) : [],
        }).unwrap();
        toast.success(res.message);
      } catch (error: unknown) {
        toast.error(error as string)
      }
    }


  return (
    <section className="h-full py-5">
      <div className="flex flex-col space-y-2 sm:justify-between sm:flex-row sm:space-y-0 sm:items-center">
        <div className="flex flex-col items-start space-y-3">
          <Heading className="text-xl md:text-2xl" level={2}>
            Project Tasks
          </Heading>
          <Typography className="text-sm text-muted-foreground">
            This is a list of all the tasks in this project.
          </Typography>
        </div>
        <SideModal
          action={<Button size={"sm"} className='w-max'>New Task</Button>}
          className="w-full md:max-w-lg lg:max-w-2xl"
          side="right"
          title="Add a new task"
          description="Fill in the form below to create a new task"
        >
          <div className='mt-10'>
            <TaskForm  
            onSubmit={handleCreateTask}
            team={team}
            onCancel={() => navigate(`/app/projects/${projectId}/tasks`)}
            />
          </div>
        </SideModal>
      </div>
      {isLoading && <Loading />}
      {!isLoading && tasks?.length === 0 && (
        <EmptyState
          className="mt-10"
          text="No Tasks"
          desc="There are no tasks in this project"
        />
      )}
      <TaskList tasks={tasks} />
    </section>
  );
};

export default ProjectTasksPage;
