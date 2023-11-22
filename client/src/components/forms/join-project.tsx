import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

import { useForm } from 'react-hook-form';
import {
  ProjectOnboardSchemaType,
  projectOnboardSchema,
} from '@/lib/validation/project';
import { useJoinProject } from '@/hooks/use-join-project';
import { zodResolver } from '@hookform/resolvers/zod';

interface JoinProjectFormProps {
  onClose: () => void;
}

export const JoinProjectForm = ({onClose}: JoinProjectFormProps) => {
    const { joinProject } = useJoinProject();
  const form = useForm<ProjectOnboardSchemaType>({
    resolver: zodResolver(projectOnboardSchema),
    defaultValues: {
      accessCode: '',
    }
  });
  const { isSubmitting } = form.formState;

  async function onSubmit(data: ProjectOnboardSchemaType) { 
    await joinProject(data.accessCode);
    onClose();
  }

  return (
    <Form {...form}>
      <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="accessCode"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Access Code</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="abc123" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={'brand'} size={'sm'}>
          Join Project
          {isSubmitting && (
            <Icons.spinner className="ml-2 animate-spin h-4 w-4" />
          )}
        </Button>
      </form>
    </Form>
  );
};
