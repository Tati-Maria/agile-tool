import {z} from 'zod';

export const taskSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.optional(z.string().min(1).max(500)),
    status: z.enum(['Backlog', 'To Do', 'In Progress', 'Testing', 'Done', 'Paused']),
    tags: z.optional(z.string()),
    type: z.optional(z.enum(['Bug', 'Feature', 'Improvement', 'Refactor', 'Test', 'Other'])),
    priority: z.enum(['Low', 'Normal', 'High', 'Urgent']),
    dueDate: z.optional(z.date()),
    assignedTo: z.optional(z.string()),
});

export type Task = z.infer<typeof taskSchema>;