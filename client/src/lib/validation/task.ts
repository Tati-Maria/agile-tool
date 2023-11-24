import {z} from 'zod';

export const taskSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.optional(z.string().min(1).max(500)),
    status: z.enum(['To Do', 'In Progress', "Done", "Quality Check"]),
    priority: z.enum(['Low', 'Medium', 'High']),
    dueDate: z.optional(z.date()),
    assignedTo: z.optional(z.string()),
});


export type Task = z.infer<typeof taskSchema>;