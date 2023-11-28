/* eslint-disable @typescript-eslint/no-explicit-any */
import { TiDeleteOutline } from 'react-icons/ti';
import { useRemoveTaskToSprintMutation } from '@/store/slices/sprint-api-slice';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import DeleteModal from '../modals/delete-modal';
import { useState } from 'react';
/*
This components is gonna be 
responsible for removing a task
from a sprint
*/

interface RemoveTaskProps extends React.HTMLAttributes<HTMLElement> {
    sprintId: string;
    taskId: string;
}

const RemoveTask = ({sprintId, taskId, className}: RemoveTaskProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [removeTaskToSprint, { isLoading }] = useRemoveTaskToSprintMutation();

    const handleRemoveTask = async () => {
        try {
            const res = await removeTaskToSprint({
                sprintId,
                formData: {
                    task: taskId
                }
            }).unwrap();
            toast.success(res.message);
        } catch (error: any) {
            toast.error(error.message);
        }
    }


  return (
    <>
    {isModalOpen && (
        <DeleteModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleRemoveTask} 
        isLoading={isLoading}
        title='Remove Task'
        description='Are you sure you want to remove this task from this sprint?'
        />
    )}
      <Button
        variant={'destructive'}
        size={'icon'}
        onClick={() => setIsModalOpen(true)}
        className={cn(
          className,
          'absolute -top-7 h-10 w-10 bg-transparent hover:bg-transparent -left-7 p-0 m-3'
        )}
      >
        <TiDeleteOutline className="inline-block h-6 w-6 bg-red-500 hover:bg-red-600 rounded-full" />
      </Button>
    </>
  );
};

export default RemoveTask;
