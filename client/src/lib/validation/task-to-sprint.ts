import {z} from 'zod';

export const taskToSprintSchema = z.object({
    tasks: z.array(z.string()).refine((val) => val.some((v) => v !== "", {
        message: "At least one task must be selected",
    })),
});

export type TaskToSprintFormData = z.infer<typeof taskToSprintSchema>;