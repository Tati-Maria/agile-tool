import { UserStory } from '@/types';

import { Loading, EmptyState } from '@/components/shared';
import UserStoryCard from '@/components/cards/user-story-card';

interface UserStoryListProps {
  userStories: UserStory[];
  isLoading: boolean;
}

const UserStoryList = ({ userStories, isLoading }: UserStoryListProps) => {
  return (
    <div className="h-full">
      {isLoading && <Loading />}
      {userStories?.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {userStories.map(userStory => (
            <UserStoryCard key={userStory._id} userStory={userStory} />
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
