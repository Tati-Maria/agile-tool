// Desc: Modal for adding a task to a sprint
import { useGetProjectUserStoriesQuery } from "@/store/slices/user-story-api-slice";
import { toast } from "sonner";
import { useAddTaskToSprintMutation } from "@/store/slices/sprint-api-slice";

import { Modal } from "@/components/modals/modal";
import { Loading, EmptyState } from "@/components/shared";
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
    const {data: userStories, isLoading: isUserStoriesLoading} = useGetProjectUserStoriesQuery(projectId, {skip: !projectId});
    const userStoriesWithTasks = userStories?.filter(userStory => userStory.tasks.length > 0);
    const tasks = userStoriesWithTasks?.map(userStory => userStory.tasks).flat();
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
      {isUserStoriesLoading && <Loading />}
      {!isUserStoriesLoading && !userStoriesWithTasks && (
        <EmptyState text="No tasks found" />
      )}
      <ScrollArea className="h-[400px] w-full">
        <TaskListForm 
        tasks={tasks}
        onSubmit={onSubmit}
        />
      </ScrollArea>
    </Modal>
  );
}

export default AddTaskToSprintModal