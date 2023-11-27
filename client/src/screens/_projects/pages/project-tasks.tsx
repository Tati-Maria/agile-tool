import { Heading, Loading, EmptyState, Typography } from '@/components/shared';
// import { Button } from '@/components/ui/button';

import { useParams, useNavigate } from 'react-router-dom';
// import TaskList from '@/containers/task-list';
import { useSetDocumentTitle } from '@/hooks/user-document-title';
import { SideModal } from '@/components/modals/side-modal';
import { Button } from '@/components/ui/button';

const ProjectTasksPage = () => {
    useSetDocumentTitle('Project Tasks');
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();

    

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
          className="w-full md:max-w-lg lg:max-w-xl"
          side="right"
          title="Add a new task"
          description="Fill in the form below to create a new task"
        >
          <div className='mt-10'>
            form goes here
          </div>
        </SideModal>
      </div>
      {/* <TaskList tasks={userStoryTasks} /> */}
    </section>
  );
};

export default ProjectTasksPage;
