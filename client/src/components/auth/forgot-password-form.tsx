import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/ui/icons';

import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeOffIcon} from 'lucide-react';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from '@/lib/validation/user';
import { FormGroup, Typography } from '@/components/shared';
import { useForgotPassword } from '@/hooks/use-forgot-password';

const ForgotPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const { forgot } = useForgotPassword();

  const handleSubmit = async (data: ForgotPasswordSchema) => {
    await forgot(data);
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="space-y-5 mt-8"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormGroup>
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="******"
                    />
                  </FormControl>
                  <div>
                    {showPassword ? (
                      <EyeOffIcon
                        className="absolute right-3 top-11 text-slate-400 hover:text-slate-500 h-4 w-4 cursor-pointer"
                        onClick={toggleShowPassword}
                      />
                    ) : (
                      <EyeIcon
                        className="absolute right-3 top-11 text-slate-400 hover:text-slate-500 h-4 w-4 cursor-pointer"
                        onClick={toggleShowPassword}
                      />
                    )}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm Password"
                    />
                  </FormControl>
                  <div>
                    {showPassword ? (
                      <EyeOffIcon
                        className="absolute right-3 top-11 text-slate-400 hover:text-slate-500 h-4 w-4 cursor-pointer"
                        onClick={toggleShowPassword}
                      />
                    ) : (
                      <EyeIcon
                        className="absolute right-3 top-11 text-slate-400 hover:text-slate-500 h-4 w-4 cursor-pointer"
                        onClick={toggleShowPassword}
                      />
                    )}
                  </div>
                </FormItem>
              )}
            />
          </FormGroup>
          <div className="flex-col-center space-y-5">
            <Button>
              Reset Password
              {form.formState.isSubmitting && (
                <Icons.spinner className="animate-spin h-4 w-4 ml-2" />
              )}
            </Button>
            <Typography className="text-center text-slate-700">
              Don't have an account?{' '}
              <Link
                className="link-text text-blue-600 underline"
                to="/register"
              >
                Register
              </Link>
            </Typography>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
