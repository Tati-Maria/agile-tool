import {z} from 'zod';

export const userSchema = z.object({
    name: z.string().min(2, {message: 'Name must be at least 2 characters long'}).max(50, {message: 'Name cannot exceed 50 characters'}).nonempty({message: 'Please enter your name'}),
    email: z.string().email({message: 'Please enter a valid email address'}),
    password: z.string().min(6, {message: 'Password must be at least 6 characters long'}),
    avatar: z.custom<File[]>(),
    confirmPassword: z.string().min(6, {message: 'Password must be at least 6 characters long'}),
    role: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
});

export const loginSchema = z.object({
    email: z.string().email({message: 'Please enter a valid email address'}),
    password: z.string().min(6, {message: 'Password must be at least 6 characters long'}),
})

export type UserSchema = z.infer<typeof userSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;