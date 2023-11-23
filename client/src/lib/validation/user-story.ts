import {z} from 'zod';

export const userStorySchema = z.object({
    name: z.string().min(1).max(255),
    description: z.optional(z.string()),
    acceptanceCriteria: z.optional(z.string()),
    estimationPoints: z.optional(z.coerce.number().min(0).max(1000)),
});

export type UserStory = z.infer<typeof userStorySchema>;