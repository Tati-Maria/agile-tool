import { Document } from "mongoose";
import { IUser } from "./user-interface";
import { ITask } from "./tasks";

export interface IComment extends Document {
    content: string;
    author: IUser;
    task: ITask;
    createdAt: Date;
    updatedAt: Date;
}