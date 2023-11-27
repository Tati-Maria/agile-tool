// import { Heading, Loading, EmptyState, Typography } from '@/components/shared';
// import { Button } from '@/components/ui/button';

import { useParams, useNavigate } from 'react-router-dom';
// import TaskList from '@/containers/task-list';
import { useSetDocumentTitle } from '@/hooks/user-document-title';

const ProjectTasksPage = () => {
    useSetDocumentTitle('Project Tasks');
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();

    

  return (
    <section className='h-full py-5'>
      <div className="flex flex-col items-start space-y-3">
        
        <Typography>
            Project tasks are all the tasks that are associated with the user stories in this project.
        </Typography>
      </div>
      {/* <TaskList tasks={userStoryTasks} /> */}
    </section>
  );
};

export default ProjectTasksPage;
