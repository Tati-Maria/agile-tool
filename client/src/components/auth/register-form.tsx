import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { UserSchema, userSchema } from '@/lib/validation/user';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormGroup,
  Required,
  SelectField,
  Typography,
  FileUploader
} from '@/components/shared';
import { roles } from '@/constants';
import { Icons } from '@/components/ui/icons';
import { useRegister } from '@/hooks/use-register';


const RegisterForm = () => {
  const {register} = useRegister();
  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        avatar: [],
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async(data: UserSchema) => {
    await register(data);
  }

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <Form {...form}>
        <form className="space-y-4 md:space-y-6 w-full" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField 
          control={form.control}
          name='avatar'
          render={({field}) => (
            <FormItem>
                <FormControl>
                    <FileUploader 
                    fielChange={field.onChange}
                    />
                </FormControl>
            </FormItem>
          )}
          />
          <FormGroup>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full Name <Required />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Enter your full name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <Required />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      disabled={isSubmitting}
                      placeholder="example@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormGroup>

          <FormGroup>
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password <Required />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  <FormDescription className='text-xs'>
                    Password must be at least 6 characters long
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Confirm Password <Required />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Confirm your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormGroup>
          <FormField
            name="role"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Role <Required />
                </FormLabel>
                <SelectField
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  options={roles}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex-col-center ">
            <Button className="w-full mb-4" type="submit" variant="brand">
              Register
              {isSubmitting && (
                <Icons.spinner className="animate-spin h-4 w-4 ml-2" />
              )}
            </Button>
            <Typography className="text-slate-500 text-center">
              Already have an account?{' '}
              <Link className="link-text text-blue-500 underline" to="/login">
                Login
              </Link>
            </Typography>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
