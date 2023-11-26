import { Document } from "mongoose";
import { ISprint } from "./sprint";
import { IUser } from "./user-interface";
import { IComment } from "./comment";
import { IAttachment } from "./attachment";

export interface ITask extends Document {
    name: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    type: TaskType;
    resolution: TaskResolution | null; // It's not required because it's only used when the task is closed
    sprint: ISprint;
    assignedTo: IUser;
    projectId: string;
    createdBy: IUser;
    attachments: IAttachment[] | null;
    comments: IComment[];
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
}

enum TaskStatus {
    BACKLOG = "Backlog",
    TODO = "To Do",
    INPROGRESS = "In Progress",
    TESTING = "Testing",
    DONE = "Done",
    PAUSED= "Paused",
}

enum TaskPriority {
    LOW = "Low",
    NORMAL= "Normal",
    HIGH = "High",
    URGENT = "Urgent",
}

enum TaskType {
    BUG = "Bug",
    FEATURE = "Feature",
    IMPROVEMENT = "Improvement",
    REFACTOR = "Refactor",
    TEST = "Test",
    OTHER = "Other",
}

enum TaskResolution {
    FIXED = "Fixed",
    DUPLICATE = "Duplicate",
    INVALID = "Invalid",
    WONTFIX = "Won't Fix",
    WORKSFORME = "Works For Me",
    UNRESOLVED = "Unresolved",
    OTHER = "Other",
}