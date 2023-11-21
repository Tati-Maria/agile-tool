import { Request } from "express";
import { Document } from "mongoose";
import { IProject } from "./project-interface";
import { IComment } from "./comment";
import { ITask } from "./tasks";

export interface IUser extends Document{
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    avatar: string;
    avatarPublicId?: string; // Cloudinary public id
    createdAt: Date;
    updatedAt: Date;

    // Methods
    matchPassword(password: string): Promise<boolean>;
    isModified(field: string): boolean;

    projects: IProject[];
    comments: IComment[];
    tasks: ITask[];
}

export interface IUserRequest extends Request {
    user?: IUser;
}