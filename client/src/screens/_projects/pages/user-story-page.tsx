import { Heading, Typography } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { UserStoryModal } from '@/components/modals/user-story-modal';

import UserStoryList from '@/containers/user-story-list';
import { useAuth } from '@/hooks/use-auth';
import { useGetProjectUserStoriesQuery } from '@/store/slices/user-story-api-slice';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const UserStoryPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading } = useGetProjectUserStoriesQuery(
    projectId as string
  );

  return (
    <>
      {showModal && (
        <UserStoryModal
          isClose={() => setShowModal(false)}
          isOpen={showModal}
          projectId={projectId}
        />
      )}
      <section className="h-full py-5">
        <div className="flex-col-center space-y-4 md:flex-row md:justify-between md:space-y-0 mb-10">
          <div>
            <Heading className="text-xl md:text-2xl" level={2}>
              Project User Stories
            </Heading>
            <Typography className="text-muted-foreground">
              {user?.role === 'Product Owner'
                ? 'Manage your project user stories here and add tasks to them.'
                : 'View your project user stories here.'}
            </Typography>
          </div>
          <Button
            onClick={() => setShowModal(true)}
            className="w-max"
            variant={'primary'}
          >
            Add User Story
          </Button>
        </div>
        <UserStoryList userStories={data} isLoading={isLoading} />
      </section>
    </>
  );
};

export default UserStoryPage;
