import { Heading, Loading, EmptyState, Typography } from '@/components/shared';
import { Button } from '@/components/ui/button';

import { useParams, useNavigate } from 'react-router-dom';
import { useGetProjectUserStoriesQuery } from '@/store/slices/user-story-api-slice';
import { UserStory } from '@/types';
import TaskList from '@/containers/task-list';
import { useSetDocumentTitle } from '@/hooks/user-document-title';

const ProjectTasksPage = () => {
    useSetDocumentTitle('Project Tasks');
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const { data: userStories, isLoading: userStoriesLoading } = useGetProjectUserStoriesQuery(projectId || '', { skip: !projectId });
    const userStoryTasks = userStories?.map((userStory: UserStory) => userStory.tasks).flat();

    if(userStoriesLoading) {
        return (
            <section className='h-full py-5'>
                <Loading />
            </section>
        )
    } else if(!userStories || userStories?.length === 0) {
        return (
            <section className='h-full py-5'>
                <EmptyState
                    text={'No User Stories'}
                    desc={'Create a user story to add tasks'}
                    actionButton={
                        <Button 
                        onClick={() =>  navigate(`/projects/${projectId}/user-stories`)}
                        variant={'primary'} size={'sm'}>
                            Create User Story
                        </Button>
                    }
                />
            </section>
        )
    } else if(userStoryTasks?.length === 0) {
        return (
            <section className='h-full py-5'>
                <EmptyState
                    text={'No Tasks'}
                    desc={'Create a task to get started'}
                    actionButton={
                        <Button 
                        onClick={() =>  navigate(`/projects/${projectId}/user-stories`)}
                        variant={'primary'} size={'sm'}>
                            Create Task
                        </Button>
                    }
                />
            </section>
        )
    }

  return (
    <section className='h-full py-5'>
      <div className="flex flex-col items-start space-y-3">
        <Heading className='text-xl md:text-2xl' level={1}>
            {`Project Tasks (${userStoryTasks?.length})`}
        </Heading>
        <Typography>
            Project tasks are all the tasks that are associated with the user stories in this project.
        </Typography>
      </div>
      <TaskList tasks={userStoryTasks} />
    </section>
  );
};

export default ProjectTasksPage;
