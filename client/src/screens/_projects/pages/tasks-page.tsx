import { Heading, Loading, Typography } from '@/components/shared';
import { useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  DropResult,
  Draggable,
} from '@hello-pangea/dnd';
import {
  useUpdateTaskStatusMutation,
  useGetTasksQuery,
} from '@/store/slices/task-api-slice';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const TasksPage = () => {
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const { data: tasks, isLoading: tasksLoading } = useGetTasksQuery();
  const statuses = ['To Do', 'In Progress', 'Quality Check', 'Done'];

    useEffect(() => {
        if (tasks) {
        tasks.sort((a, b) => a.status.localeCompare(b.status));
        }
    }, [tasks]);

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
      console.log(res);
      toast.loading('Updating task status...');
      if(res.status === 200) {
        toast.success('Task status updated successfully!');
      }
    } catch (error) {
      const err = error as Error;
      console.log(err.message);
      toast.error(err.message);
    }
  }

  return (
    <section className="py-5">
      <div className="flex-col-center space-y-1 mb-10">
        <Heading className="text-xl md:text-2xl" level={1}>
          Project Tasks
        </Heading>
        <Typography className="text-muted-foreground">
          Manage your project tasks here.
        </Typography>
      </div>
      {tasksLoading && <Loading />}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statuses.map((status, index) => (
            <div key={index}>
              <Heading level={3}>{status}</Heading>
              <Droppable droppableId={`${index}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      'bg-gray-100 rounded-md p-4',
                      snapshot.isDraggingOver && 'bg-gray-200'
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
                                'bg-white rounded-md p-4 mb-2',
                                snapshot.isDragging && 'shadow-lg'
                              )}
                            >
                              <Heading level={4} className="mb-2">
                                {task.name}
                              </Heading>
                              <Typography className="text-muted-foreground">
                                {task.description}
                              </Typography>
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
    </section>
  );
};

export default TasksPage;
