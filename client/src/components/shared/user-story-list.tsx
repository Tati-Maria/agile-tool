import { UserStory } from "@/types";
import { EmptyState } from "@/components/shared";
import { Button } from "@/components/ui/button";

interface UserStoryListProps {
    projectId?: string;
    userStories: UserStory[];
}

const UserStoryList = ({projectId, userStories}: UserStoryListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-52">
        <ul className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 overflow-x-auto">
            {userStories?.length === 0 && (<EmptyState text="No user stories" />)}
        </ul>
        <div className="border rounded-md hover:border-blue-100 transition-colors cursor-pointer justify-center flex-col-center border-dashed border-muted">
            <Button variant={"ghost"} className="flex hover:bg-transparent flex-col space-y-1">
                <span>Add User Story</span>
            </Button>
        </div>
    </div>
  )
}

export default UserStoryList