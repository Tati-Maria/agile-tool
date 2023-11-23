import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PickADate } from '@/components/forms/pick-a-date';
import { FormGroup } from '@/components/shared';
import { Icons } from '@/components/ui/icons';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sprintSchema, SprintSchema } from '@/lib/validation/sprint';
import { Link } from 'react-router-dom';

interface CreateSprintFormProps {
  values?: SprintSchema;
  onSubmit: (values: SprintSchema) => void;
  buttonText: string;
}

export const CreateSprintForm = ({
  values,
  onSubmit,
  buttonText,
}: CreateSprintFormProps) => {
  const form = useForm<SprintSchema>({
    resolver: zodResolver(sprintSchema),
    defaultValues: {
      name: values?.name ?? '',
      startDate: values?.startDate ?? undefined,
      endDate: values?.endDate ?? undefined,
      goal: values?.goal ?? '',
    },
  });

  async function handleSubmit(values: SprintSchema) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sprint's Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="goal"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sprint's Goal</FormLabel>
              <FormControl>
                <Textarea {...field} disabled={form.formState.isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormGroup>
          <FormField
            name="startDate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <PickADate value={field.value} onChange={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="endDate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <PickADate value={field.value} onChange={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
        </FormGroup>
        <div className="flex items-center justify-end space-x-4 w-full">
          <Button asChild type="button" variant={'outline'}>
            <Link to="/projects">Cancel</Link>
          </Button>
          <Button type="submit" variant={'brand'}>
            {buttonText}
            {form.formState.isSubmitting && (
              <Icons.spinner className="animate-spin ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
