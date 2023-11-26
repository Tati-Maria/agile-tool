
import { useGetSprintByIdQuery } from "@/store/slices/sprint-api-slice";
import { toast } from "sonner";
import { useAddTaskToSprintMutation } from "@/store/slices/sprint-api-slice";

import { Modal } from "@/components/modals/modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskListForm } from "../forms/task-list-form";
import { TaskToSprintFormData } from "@/lib/validation/task-to-sprint";

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
        />
      </ScrollArea>
    </Modal>
  );
}

export default AddTaskToSprintModal