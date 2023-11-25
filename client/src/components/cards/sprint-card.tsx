import { Typography, Heading, EmptyState } from "@/components/shared"
import {Button} from "@/components/ui/button";
import AddTaskToSprintModal from "@/components/modals/add-task-to-sprint";
import { BiEditAlt } from 'react-icons/bi';

import { DiScrum } from 'react-icons/di';
import { cn } from "@/lib/utils";
import { IoMdDoneAll } from 'react-icons/io';
import { GoTasklist } from 'react-icons/go';
import {FcTodoList} from 'react-icons/fc';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { Link } from "react-router-dom";
import { getSprintStatus } from "@/lib/utils";
import { Sprint } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import TaskSprintCArd from "./task-sprint";
import { useLocation } from "react-router-dom";

interface SprintCardProps {
    sprint: Sprint;
}

const SprintCard = ({sprint}: SprintCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const done = getSprintStatus(new Date(sprint.startDate), new Date(sprint.endDate)) === 'Done';
    const started = getSprintStatus(new Date(sprint.startDate), new Date(sprint.endDate)) === 'Started';
    const upcoming = getSprintStatus(new Date(sprint.startDate), new Date(sprint.endDate)) === 'Not Started';
    const location = useLocation();

  return (
    <>
      {isModalOpen && (
        <AddTaskToSprintModal
          projectId={sprint.project._id}
          sprintId={sprint._id}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div className="flex-col-center border p-4 rounded-sm border-t-4">
        <div className="space-y-2">
          <Heading className="text-xl hover:link-text w-max" level={3}>
            <Link to={`/sprints/${sprint._id}`}>{sprint.name}</Link>
          </Heading>
          {location.pathname === `/sprints/${sprint._id}` && (
            <>
            <Typography className="text-xs text-muted-foreground">
              {sprint.goal}
            </Typography>
            <Link to={`/projects/${sprint.project._id}/sprints/${sprint._id}/update`}>
              <BiEditAlt className="inline-block" />
            </Link>
            </>
          )}
          <div className="flex-between">
            <div className="flex-center space-x-1">
              <Typography
                className={cn(
                  'text-xs font-bold',
                  done && 'text-green-500',
                  started && 'text-indigo-500 dark:text-indigo-300',
                  upcoming && 'text-gray-500'
                )}
              >
                {done && <IoMdDoneAll className="inline-block mr-1" />}
                {started && <DiScrum size={18} className="inline-block mr-1" />}
                {upcoming && (
                  <AiOutlineClockCircle className="inline-block mr-1" />
                )}
                {getSprintStatus(
                  new Date(sprint.startDate),
                  new Date(sprint.endDate)
                )}
              </Typography>
              <Typography className="text-xs text-muted-foreground">
                {format(new Date(sprint.startDate), 'MMM dd yyyy')} to{' '}
                {format(new Date(sprint.endDate), 'MMM dd yyyy')}
              </Typography>
            </div>
            <div className="flex-center space-x-3">
              <Typography className="text-xs inline-flex items-center">
                <GoTasklist className="inline-block mr-1" />
                {sprint.tasks.length}
              </Typography>
              <Typography className="text-xs inline-flex items-center">
                <FcTodoList className="inline-block mr-1" />
                {sprint.tasks.filter(task => task.status === 'Done').length}
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-6 mb-4 mt-7 h-full">
          {sprint.tasks?.map(task => (
            <TaskSprintCArd sprint={sprint} task={task} key={task._id} />
          ))}
          {sprint.tasks?.length === 0 && (
            <EmptyState
              text={'No tasks'}
              desc={'Add tasks to the sprint'}
              actionButton={
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant={'primary'}
                  size={'sm'}
                >
                  Add Task
                </Button>
              }
            />
          )}
        </div>
        {sprint.tasks?.length > 0 && (
          <div className="mt-4">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant={'brand'}
              size={'sm'}
            >
              Add Task
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default SprintCard