import { UserStory } from "@/types";
import { CiCirclePlus } from "react-icons/ci";
import { EmptyState } from "@/components/shared";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserStoryModal } from "@/components/modals/user-story-modal";

interface UserStoryListProps {
    projectId?: string;
    userStories: UserStory[];
}

const UserStoryList = ({projectId, userStories}: UserStoryListProps) => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    {isOpen && (
        <UserStoryModal
        projectId={projectId}
        isOpen={isOpen}
        isClose={() => setIsOpen(false)}
        />
    )}
      <div className="grid grid-cols-1 md:grid-cols-3 h-52">
        <ul className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 overflow-x-auto">
          {userStories?.length === 0 && <EmptyState text="No user stories" />}
        </ul>
        <div className="border rounded-md hover:border-blue-100 transition-colors cursor-pointer justify-center flex-col-center border-dashed border-muted">
          <Button
            onClick={() => setIsOpen(true)}
            variant={'ghost'}
            className="flex hover:bg-transparent flex-col space-y-1"
          >
            <CiCirclePlus className="text-2xl" />
            <span>Add User Story</span>
          </Button>
        </div>
      </div>
    </>
  );
}

export default UserStoryList