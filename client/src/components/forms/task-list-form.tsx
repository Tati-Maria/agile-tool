import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import {
  taskToSprintSchema,
  TaskToSprintFormData,
} from '@/lib/validation/task-to-sprint';
import { Task } from '@/types';
import { Typography } from '../shared';

interface TaskListFormProps {
  tasks: Task[] | undefined;
  onSubmit: (values: TaskToSprintFormData) => void;
  values?: TaskToSprintFormData;
}

export const TaskListForm = ({
  tasks,
  onSubmit,
  values,
}: TaskListFormProps) => {
  const form = useForm<TaskToSprintFormData>({
    resolver: zodResolver(taskToSprintSchema),
    defaultValues: {
      tasks: values?.tasks || [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="tasks"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Tasks</FormLabel>
                <FormDescription>
                  Select the tasks you want to add to the sprint
                </FormDescription>
              </div>
              {tasks?.map(task => (
                <FormField
                  key={task._id}
                  control={form.control}
                  name={'tasks'}
                  render={({ field }) => {
                    return (
                      <FormItem
                        className="flex flex-row items-start space-x-3"
                        key={task._id}
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(task._id)}
                            onCheckedChange={checked => {
                              return checked
                                ? field.onChange([...field.value, task._id])
                                : field.onChange(
                                    field.value.filter(id => id !== task._id)
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal flex">
                          <div>
                            <Typography className="text-sm font-bold">
                              {task.name}
                            </Typography>
                            <span className='text-muted-foreground text-xs'>
                              Due Date {format(new Date(task.dueDate), 'MMM dd yyyy')}
                            </span>
                          </div>
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          variant="brand"
          size="sm"
          className="mt-4"
        >
          Add Tasks
        </Button>
      </form>
    </Form>
  );
};
