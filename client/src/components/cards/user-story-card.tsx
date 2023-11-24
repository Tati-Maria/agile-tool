import { Link } from "react-router-dom"
import { Heading, Typography } from "@/components/shared"
import { User, UserStory } from "@/types";
import { VscDebugBreakpointFunctionUnverified } from 'react-icons/vsc';
import { CiViewList } from 'react-icons/ci';
import { FcTodoList } from 'react-icons/fc';
import { Button } from "../ui/button";
import { useState } from "react";
import TaskModal from "../modals/task-modal";

interface UserStoryCardProps {
    userStory: UserStory;
    team: User[];
}

const UserStoryCard = ({userStory, team}: UserStoryCardProps) => {
    const [openModal, setOpenModal] = useState(false);

  return (
    <>
    {openModal && (
      <TaskModal 
      team={team}
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      userStoryId={userStory._id}
      />
    )}
      <li className="flex-col-center space-y-2 border p-4 rounded-sm shadow-sm border-t-4 border-t-violet-400">
        <Heading className="hover:text-violet-500 text-lg w-max" level={3}>
          <Link className="w-full" to={`/user-stories/${userStory._id}`}>
            {userStory.name}
          </Link>
        </Heading>
        <Typography className="dark:text-slate-200 text-slate-800">
          {userStory.description}
        </Typography>
        <div className="flex items-center space-x-3">
          <Typography className="text-xs text-muted-foreground flex items-center">
            <FcTodoList className="inline-block mr-1" />
            <span>{userStory.tasks.length} Tasks</span>
          </Typography>
          <Typography className="inline-flex items-center text-xs text-muted-foreground">
            <CiViewList className="inline-block mr-1" />
            <span>
              {userStory.tasks.filter(task => task.status === 'Done').length}{' '}
              Completed
            </span>
          </Typography>
          <Typography className="inline-flex items-center text-xs text-muted-foreground">
            <VscDebugBreakpointFunctionUnverified className="inline-block text-iconSecondary mr-1" />
            {userStory.estimationPoints} Points
          </Typography>
        </div>
        <div>
          <Button 
          onClick={() => setOpenModal(true)}
          variant={'brand'} className="h-7 w-full mt-4">
            Add Task
          </Button>
        </div>
      </li>
    </>
  );
}

export default UserStoryCard