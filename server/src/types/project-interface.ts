import { Document } from "mongoose";
import { IUser } from "./user-interface";
import { ISprint } from "./sprint";

export interface IProject extends Document {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    logo: string;
    logoPublicId: string; // Cloudinary public ID
    team: IUser[];
    owner: IUser;
    sprints: ISprint[];
    attachments: string[];
    createdAt: Date;
    updatedAt: Date;
}

