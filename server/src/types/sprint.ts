import { Document } from "mongoose";
import { IProject } from "./project-interface";
import { ITask } from "./tasks";

export interface ISprint extends Document {
    name: string;
    startDate: Date;
    endDate: Date;
    project: IProject;
    goal: string;
    tasks: ITask[];
    createdAt: Date;
    updatedAt: Date;
}