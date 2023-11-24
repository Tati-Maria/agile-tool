import { Document } from "mongoose";
import { ISprint } from "./sprint";
import { IUser } from "./user-interface";
import { IComment } from "./comment";

export interface ITask extends Document {
    name: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
    assignedTo: IUser;
    comments: IComment[];
    sprint: ISprint;
    createdAt: Date;
    updatedAt: Date;
}

enum TaskStatus {
    TO_DO = "To Do",
    IN_PROGRESS = "In Progress",
    QUALITY_CHECK = "Quality Check",
    DONE = "Done",
}

enum TaskPriority {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
}