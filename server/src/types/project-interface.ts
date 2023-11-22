import { Document } from "mongoose";
import { IUser } from "./user-interface";
import { ISprint } from "./sprint";
import { ILogEntry } from "./activity";
import { IUserStory } from "./user-story";

export interface IProject extends Document {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    logo: string;
    logoPublicId: string; // Cloudinary public ID
    accessCode: string;
    team: string[];
    owner: IUser;
    sprints: ISprint[];
    attachments: string[];
    createdAt: Date;
    updatedAt: Date;
    activityLog: ILogEntry[];
    userStories: IUserStory[];
}

