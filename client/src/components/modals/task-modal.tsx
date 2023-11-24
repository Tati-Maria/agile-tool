import { TaskForm } from "@/components/forms/task-form";
import { Modal } from "@/components/modals/modal";
import { Task } from "@/lib/validation/task";
import { useAddTaskToUserStoryMutation } from "@/store/slices/user-story-api-slice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { User } from "@/types";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStoryId: string;
  team: User[];
}

const TaskModal = ({isOpen, onClose, userStoryId, team}: TaskModalProps) => {
    const [createTask] = useAddTaskToUserStoryMutation();
    const navigate = useNavigate(); 

    async function handleCreateTask(values: Task) {
        try {
            const res = await createTask({
                userStoryId: userStoryId,
                formData: {
                    name: values.name,
                    description: values.description,
                    status: values.status,
                    priority: values.priority,
                    assignedTo: values.assignedTo,
                    dueDate: values.dueDate,
                }
            }).unwrap();
            toast.success(res.message);
            onClose();
            navigate(`/projects/${res.projectId}/user-stories/${res._id}`)
        } catch (error) {
            const err = error as Error;
            toast.error(err.message);
        }
    }

  return (
    <Modal
    title="Create Task"
    isOpen={isOpen}
    onClose={onClose}
    description="Fill out the form below to create a new task."
    >
        <TaskForm 
        onSubmit={handleCreateTask}
        onCancel={onClose}
        team={team}
        />
    </Modal>
  )
}

export default TaskModal