import { Document } from "mongoose";
import { IUser } from "./user-interface";
import { ISprint } from "./sprint";
import { ILogEntry } from "./activity";
import { ITask } from "./tasks";

export interface IProject extends Document {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    logo: string;
    logoPublicId: string; // Cloudinary public ID
    accessCode: string;
    team: string[];
    owner: IUser;
    sprints: ISprint[];
    attachments: string[];
    tasks: ITask[];
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    activityLog: ILogEntry[];
}

