import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Textarea} from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/ui/icons';
import { Required, FileUploader } from '@/components/shared';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project } from "@/types"
import { ProjectSchemaType, projectSchema } from '@/lib/validation/project';

interface CreateProjectFormProps {
  onSubmit: (values: ProjectSchemaType) => void;
  isLoading: boolean;
  buttonText: string;
  values?: Project;
}

export const CreateProjectForm = ({
  onSubmit,
  values,
  isLoading,
  buttonText,
}: CreateProjectFormProps) => {
  const form = useForm<ProjectSchemaType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: values?.name || '',
      description: values?.description || '',
      logo: [] || values?.logo,
    },
  });

  const handleSubmit = (data: ProjectSchemaType) => {
    onSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField 
        name="logo"
        control={form.control}
        render={({ field}) => (
            <FormItem>
                <FileUploader 
                fielChange={field.onChange}
                mediaUrl={values?.logo}
                />
            </FormItem>
        )}
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>
                Choose a name for your project? <Required />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="My Awesome Project"
                  type="text"
                  {...field}
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
                <FormLabel>
                    Describe your project <Required />
                </FormLabel>
                <FormControl>
                    <Textarea 
                    className='resize-none h-24'
                    {...field}
                    disabled={formState.isSubmitting}
                    />
                </FormControl>
            </FormItem>
        )} 
        />
        <Button type='submit' variant={"brand"} size={"sm"}>
            {buttonText}
            {isLoading && form.formState.isSubmitting ? (<Icons.spinner className='animate-spin ml-2 h-4 w-4' />) : (<Icons.plus className='ml-2 h-4 w-4' />)}
        </Button>
      </form>
    </Form>
  );
};
