import { Task } from "@/types";
import { DragDropContext, Droppable, DropResult, Draggable } from "@hello-pangea/dnd";
import { useUpdateTaskStatusMutation } from "@/store/slices/task-api-slice";
import { toast } from "sonner";
import { cn} from "@/lib/utils";

import TaskCard from "@/components/cards/task-card";
import { Heading } from "@/components/shared";

interface TaskListProps {
    tasks: Task[] | undefined;
}

const TaskList = ({tasks}: TaskListProps) => {
    const [updateTaskStatus] = useUpdateTaskStatusMutation();
    const statuses = ["Backlog", "In Progress", "Testing", "Done"];


    async function handleOnDragEnd(result: DropResult) {
      const { destination, source, draggableId } = result;
      if (!destination) return;

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return;

      const task = tasks?.find(task => task._id === draggableId);
      if (!task) return;

      const newTask = {
        ...task,
        status: statuses[Number(destination.droppableId)],
      };

      try {
        const res = await updateTaskStatus({
          id: newTask._id,
          status: newTask.status,
        }).unwrap();
        toast.success(res.message);
      } catch (error) {
        const err = error as Error;
        toast.error(err.message);
      }
    }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 mt-10 rounded-md">
        {statuses.map((status, index) => (
          <div className="bg-muted rounded-xl p-2" key={index}>
            <div className="border p-3 border-white rounded-xl mb-4">
              <Heading
                className={cn(
                  'text-lg font-extrabold'
                )}
                level={3}
              >
                {status}
              </Heading>
            </div>
            <Droppable droppableId={`${index}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    'rounded-md',
                    snapshot.isDraggingOver &&
                      'border-2 border-dashed border-teal-500'
                  )}
                >
                  {tasks
                    ?.filter(task => task.status === status)
                    .map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={cn(
                              'rounded-md mb-2',
                              snapshot.isDragging && 'border border-teal-500'
                            )}
                          >
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}

export default TaskList