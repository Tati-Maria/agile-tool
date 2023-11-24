import { UserStory } from '@/types';

import { Loading, EmptyState } from '@/components/shared';
import UserStoryCard from '@/components/cards/user-story-card';
import { useGetProjectQuery } from '@/store/slices/project-api-slice';

interface UserStoryListProps {
  userStories: UserStory[];
  isLoading: boolean;
  projectId: string;
}

const UserStoryList = ({ userStories, isLoading, projectId }: UserStoryListProps) => {
  const {data} = useGetProjectQuery(projectId, {skip: !projectId});
  const projectTeam = data?.team;

  return (
    <div className="h-full">
      {isLoading && <Loading />}
      {userStories?.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {userStories.map(userStory => (
            <UserStoryCard 
            key={userStory._id} 
            userStory={userStory} 
            team={projectTeam}
            />
          ))}
        </ul>
      ) : (
        <EmptyState
          text="No User Stories Found"
          desc="Add one to get started"
        />
      )}
    </div>
  );
};

export default UserStoryList;
