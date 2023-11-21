import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/ui/icons';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '@/lib/validation/user';
import { Link } from 'react-router-dom';
import { Typography } from '@/components/shared';
import { useLogin } from '@/hooks/use-login';


const LoginForm = () => {
  const {login} = useLogin();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = async (data: LoginSchema) => {
    await login(data);
  };

  return (
    <Form {...form}>
      <form className='space-y-5 mt-8' onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input {...field} id="email" type="email" placeholder="Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </FormControl>
              <FormDescription className="text-xs">
                forgot password?{' '}
                <Link
                  className="link-text text-blue-600 underline"
                  to="/forgot-password"
                >
                  click here
                </Link>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-3">
          <Button variant={'brand'} type="submit">
            Login
            {form.formState.isSubmitting && (
                <Icons.spinner className="animate-spin h-4 w-4 ml-2" />
              )}
          </Button>
          <Typography className="text-center text-slate-700">
            Don't have an account?{' '}
            <Link className="link-text text-blue-600 underline" to="/register">
              Register
            </Link>
          </Typography>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
