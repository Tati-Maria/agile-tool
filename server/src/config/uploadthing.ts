import { createUploadthing, type FileRouter } from 'uploadthing/express';

const f = createUploadthing();

export const uploadRouter = {
  attachments: f({
    image: {
        maxFileCount: 4,
        maxFileSize: "4B"
    },
    video: {
        maxFileSize: "16MB",
        maxFileCount: 1
    },
    audio: {
        maxFileSize: "4MB",
        maxFileCount: 1
    },
    pdf: {
        maxFileSize: "4MB",
        maxFileCount: 4
    },
    text: {
        maxFileSize: "128KB",
        maxFileCount: 2
    },
  }).onUploadComplete((data) => {
    console.log("upload complete", data)
  })
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
