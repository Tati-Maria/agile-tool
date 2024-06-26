import { useState, useEffect } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Loading } from "@/components/shared";
import { useGetTasksQuery } from "@/store/slices/task-api-slice";

interface ProjectProgressProps {
    projectId: string;
}


const ProjectProgress = ({projectId}: ProjectProgressProps) => {
    const [progress, setProgress] = useState(0);
    const {data: tasks, isLoading } = useGetTasksQuery(projectId, {skip: !projectId});

    const trackerColor = (progress: number) => {
        if(progress <= 25) {
            return '#ff4d4f';
        } else if(progress > 25 && progress <= 50) {
            return '#faad14';
        } else if(progress > 50 && progress <= 75) {
            return '#1890ff';
        } else if(progress > 75 && progress <= 100) {
            return '#52c41a';
        }
    
    }

    useEffect(() => {
        if(tasks) {
            const totalTasks = tasks.length;
            const completedTasks = tasks.filter(task => task.status === "Done").length;
            const progress = Math.round((completedTasks / totalTasks) * 100);
            setProgress(progress);
        }
    }, [tasks])


  return (
    <div className="border h-full rounded-2xl py-4">
        {isLoading && (<Loading />)}
        {tasks && (
            <div className="flex h-full flex-col items-center justify-center">
                <CircularProgressbar
                    styles={{
                        path: {
                            stroke: trackerColor(progress),
                            strokeWidth: 10
                        },
                        trail: {
                            stroke: 'rgba(0, 0, 0, 0.611)',
                            strokeWidth: 10
                        }
                    }}
                className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                 value={progress} text={`${progress}%`} />
            </div>
        )}
    </div>
  )
}

export default ProjectProgress;