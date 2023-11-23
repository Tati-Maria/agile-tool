import {z} from 'zod';

export const sprintSchema = z.object({
    name: z.string().min(1).max(255),
    goal: z.string().min(1).max(255),
    startDate: z.optional(z.date()),
    endDate: z.optional(z.date()),
});

export const sprintUpdateSchema = z.object({
    name: z.optional(z.string().min(1).max(255)),
    goal: z.optional(z.string().min(1).max(500)),
    startDate: z.optional(z.date()),
    endDate: z.optional(z.date()),
});

export type SprintSchema = z.infer<typeof sprintSchema>;
export type SprintUpdateSchema = z.infer<typeof sprintUpdateSchema>;