import {z} from 'zod';

export const projectSchema = z.object({
    name: z.string({required_error: 'Project name is required'}),
    description: z.optional(z.string().min(10, {message: 'Description must be at least 10 characters long'})),
    logo: z.optional(z.custom<File[]>()),
});

export const projectUpdateSchema = z.object({
    name: z.optional(z.string({required_error: 'Project name is required'})),
    description: z.optional(z.string().min(10, {message: 'Description must be at least 10 characters long'})),
    logo: z.optional(z.custom<File[]>()),
    isActive: z.optional(z.boolean()),
});

export const projectOnboardSchema = z.object({
    accessCode: z.string({required_error: 'Access code is required'}),
});

export type ProjectSchemaType = z.infer<typeof projectSchema>;
export type ProjectUpdateSchemaType = z.infer<typeof projectUpdateSchema>;
export type ProjectOnboardSchemaType = z.infer<typeof projectOnboardSchema>;