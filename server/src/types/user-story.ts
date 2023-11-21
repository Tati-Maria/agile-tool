import { Document } from "mongoose";
import { IProject } from "./project-interface";
import { ITask } from "./tasks";

export interface IUserStory extends Document {
    name: string;
    description: string;
    acceptanceCriteria: string;
    estimationPoints: number;
    project: IProject;
    tasks: ITask[];
    createdAt: Date;
    updatedAt: Date;
}