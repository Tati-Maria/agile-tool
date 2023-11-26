import { Document } from "mongoose";
import { IUser } from "./user-interface";
import { IProject } from "./project-interface";

export interface IAttachment extends Document {
    name: string;
    description: string | null;
    type: AttachmentType;
    url: string;
    publicId: string;
    projectId: IProject;
    createdBy: IUser;
    createdAt: Date;
    updatedAt: Date;
}

enum AttachmentType {
    FILE = "File",
    LINK = "Link",
}