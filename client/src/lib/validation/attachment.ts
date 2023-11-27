import {z} from 'zod';

export const attachmentSchema = z.object({
    description: z.optional(z.string()),
    type: z.enum(['File', 'Link', 'Image']).refine((val) => val === "Link", {
        message: "Attachment type must be Link",
    }),
    url: z.optional(z.string()),
});

export type Attachment = z.infer<typeof attachmentSchema>;