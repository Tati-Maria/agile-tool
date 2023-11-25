import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SelectField } from '@/components/shared';
import { PickADate } from '@/components/forms/pick-a-date';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Icons } from '@/components/ui/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FormGroup } from '@/components/shared';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, Task } from '@/lib/validation/task';
import { User, Task as TaskType } from '@/types';
import { taskPriorities, taskStatuses } from '@/constants';

interface TaskFormProps {
  onSubmit: (data: Task) => void;
  onCancel: () => void;
  defaultValues?: TaskType;
  team: User[];
}

export const TaskForm = ({
  onCancel,
  onSubmit,
  defaultValues,
  team,
}: TaskFormProps) => {
  const form = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
      status: defaultValues?.status ?? 'To Do',
      priority: defaultValues?.priority ?? 'Low',
      assignedTo: undefined || defaultValues?.assignedTo._id,
      dueDate: new Date(defaultValues?.dueDate ?? Date.now()) ?? undefined,
    },
  });

  //remove team members that have roles other than developer/qa/tester/ui/ux
  const teamMembers = team?.filter(member => {
    return (
      member.role === 'Developer' ||
      member.role === 'QA' ||
      member.role === 'Tester' ||
      member.role === 'UI/UX Designer'
    );
  });

  const otherTeamMembers = team?.filter(member => {
    return (
      member.role !== 'Developer' &&
      member.role !== 'QA' &&
      member.role !== 'Tester' &&
      member.role !== 'UI/UX Designer'
    );
  });

  return (
    <div>
      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Task Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Task Name"
                    disabled={formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Task Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Task Description"
                    disabled={formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormGroup>
            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Task Status</FormLabel>
                  <SelectField
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    options={taskStatuses}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="priority"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Task Priority</FormLabel>
                  <SelectField
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    options={taskPriorities}
                  />
                </FormItem>
              )}
            />
          </FormGroup>
          <FormField
            name="assignedTo"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Choose a team member to assign this task to
                </FormLabel>
                <Select
                  onValueChange={value => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a team member" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Developers</SelectLabel>
                      {teamMembers?.map(member => (
                        <SelectItem key={member._id} value={member._id}>
                          <Avatar>
                            <AvatarImage
                              src={member.avatar}
                              alt={member.name}
                            />
                            <AvatarFallback>
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{member.name}</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Others</SelectLabel>
                      {otherTeamMembers?.map(member => (
                        <SelectItem key={member._id} value={member._id}>
                          <Avatar>
                            <AvatarImage
                              src={member.avatar}
                              alt={member.name}
                            />
                            <AvatarFallback>
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{member.name}</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField 
          name='dueDate'
            control={form.control}
            render={({field}) => (
                <FormItem>
                    <FormLabel htmlFor={field.name}>Due Date</FormLabel>
                    <PickADate
                    value={field.value}
                    onChange={field.onChange}
                    />
                    <FormMessage />
                </FormItem>
            )}
          />
          <div className="flex items-center space-x-4 justify-end">
            <Button variant={'outline'} type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
              {form.formState.isSubmitting && (<Icons.spinner className="animate-spin ml-2 h-4 w-4" />)}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
