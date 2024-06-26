
import { useGetSprintByIdQuery } from "@/store/slices/sprint-api-slice";
import { toast } from "sonner";
import { useAddTaskToSprintMutation } from "@/store/slices/sprint-api-slice";

import { Modal } from "@/components/modals/modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskListForm } from "../forms/task-list-form";
import { TaskToSprintFormData } from "@/lib/validation/task-to-sprint";
import { useGetTasksQuery } from "@/store/slices/task-api-slice";
import { Task } from "@/types";

interface AddTaskToSprintModalProps {
    projectId: string;
    sprintId: string;
    isOpen: boolean;
    onClose: () => void;
}

const AddTaskToSprintModal = ({projectId, sprintId, isOpen, onClose}:AddTaskToSprintModalProps) => {
    const {data: sprint} = useGetSprintByIdQuery(sprintId, {skip: !sprintId});
    const sprintTasks = sprint?.tasks;
    const [addTaskToSprint] = useAddTaskToSprintMutation();
    const {data: tasks} = useGetTasksQuery(projectId, {skip: !projectId});

    /*
    It should only show tasks that are not in the sprint
    also tasks that have due dates that are within the sprint start and end date
     */
   const filterTasks = tasks?.filter(task => {
        const taskInSprint = sprintTasks?.find(sprintTask => sprintTask._id === task._id);
        if(taskInSprint) return false;
        const tasksWithDueDate = tasks?.filter(task => task.dueDate);
        if(!tasksWithDueDate) return false;
        const taskDueDate = new Date(task.dueDate);
        const sprintStartDate = new Date(sprint?.startDate as string);
        const sprintEndDate = new Date(sprint?.endDate as string);
        if(taskDueDate >= sprintStartDate && taskDueDate <= sprintEndDate) return true;
        return false;
   });

    async function onSubmit(values: TaskToSprintFormData) {
        try {
            const res = await addTaskToSprint({
                sprintId,
                formData: {
                    tasks: values.tasks
                }
            }).unwrap();
            toast.success(res.message);
        } catch (error) {
            const err = error as Error;
            console.log(err.message);
            toast.error(err.message);
        }
    }

  return (
    <Modal
      title="Add Task to Sprint"
      description="Select a task from the list below to add to the sprint"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ScrollArea className="h-[400px] w-full">
        <TaskListForm 
        onSubmit={onSubmit}
        values={sprintTasks}
        tasks={filterTasks as Task[]}
        />
      </ScrollArea>
    </Modal>
  );
}

export default AddTaskToSprintModal