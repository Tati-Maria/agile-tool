import { useParams } from "react-router-dom"
import { useGetTaskByIdQuery, useUpdateTaskMutation } from "@/store/slices/task-api-slice";
import { useNavigate } from "react-router-dom";
import { TaskForm } from "@/components/forms/task-form";
import { useGetProjectQuery } from "@/store/slices/project-api-slice";
import { EmptyState, Heading, Loading } from "@/components/shared";
import { useSetDocumentTitle } from "@/hooks/user-document-title";
import { Task } from "@/lib/validation/task";
import { toast } from "sonner";

const convertStringToArr = (str: string) => {
  return str.split(',').map(item => item.trim());
};

const UpdateTask = () => {
    const { taskId } = useParams<{taskId: string}>();
    const {data: task, isLoading} = useGetTaskByIdQuery(taskId as string, {skip: !taskId});
    const {projectId} = useParams<{projectId: string}>();
    const {data: project} = useGetProjectQuery(projectId);
    const team = project?.team;
    const navigate = useNavigate();
    useSetDocumentTitle(`Update Task ${task?.name}`);

    const [updateTask] = useUpdateTaskMutation();
    //handle update task
    const onSubmit = async (values: Task) => {
        try {
            const res = await updateTask({
                id: taskId,
                formData: {
                    name: values.name,
                    description: values.description,
                    priority: values.priority,
                    status: values.status,
                    dueDate: values.dueDate,
                    assignedTo: values.assignedTo,
                    tags: values.tags ? convertStringToArr(values.tags) : [],
                    type: values.type,
                    
                }
            }).unwrap();
            toast.success(res.message);
            navigate(`/tasks/${task?._id}`);
        } catch (error) {
            const err = error as {message: string};
            toast.error(err.message);
        }
    }


  return (
    <section className="py-5 h-full">
        <Heading level={2}>
            Update Task
        </Heading>
        {isLoading && <Loading />}
        {!isLoading && !task && <EmptyState text="No task found" />}
        {!isLoading && task && (
            <TaskForm 
            onSubmit={onSubmit}
            team={team}
            defaultValues={task}
            onCancel={() => navigate(`/projects/${projectId}/tasks/${task?._id}`)}
            />
        )}
    </section>
  )
}

export default UpdateTask