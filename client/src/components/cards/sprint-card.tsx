import { Typography, Heading } from "@/components/shared"
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

interface SprintCardProps {
    sprint: Sprint;
}

const SprintCard = ({sprint}: SprintCardProps) => {
    const done = getSprintStatus(new Date(sprint.startDate), new Date(sprint.endDate)) === 'Done';
    const started = getSprintStatus(new Date(sprint.startDate), new Date(sprint.endDate)) === 'Started';
    const upcoming = getSprintStatus(new Date(sprint.startDate), new Date(sprint.endDate)) === 'Not Started';

  return (
    <li className="flex-col-center border p-4 rounded-sm border-t-4">
      <div className="space-y-2">
        <Heading className="text-xl hover:link-text" level={3}>
          <Link to={`/sprints/${sprint._id}`}>{sprint.name}</Link>
        </Heading>
        <div className="flex-between">
          <div className="flex-center space-x-1">
            <Typography
              className={cn(
                'text-xs font-bold',
                done && 'text-green-500',
                started && 'text-indigo-500',
                upcoming && 'text-gray-500'
              )}
            >
              {done && <IoMdDoneAll className="inline-block mr-1" />}
              {started && <DiScrum className="inline-block mr-1" />}
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
      <ul>{/* List of tasks */}</ul>
      {/* Add new Task */}
    </li>
  );
}

export default SprintCard