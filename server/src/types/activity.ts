import { Document, Schema } from "mongoose";
import { IUser } from "./user-interface";
import { IProject } from "./project-interface";


export interface ILogEntry extends Document {
    user: IUser;
    action: ActivityAction;
    details: string;
    entity: ActivityEntity;
    entityId: string | Schema.Types.ObjectId;
    projectId: IProject;
    timestamp: Date;
}

enum ActivityAction {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    JOIN = "JOIN",
    LEAVE = "LEAVE",
    ADD = "ADD",
    REMOVE = "REMOVE",
    UPLOAD = "UPLOAD",
    COMPLETE = "COMPLETE",
    ARCHIVE = "ARCHIVE",
}

enum ActivityEntity {
    TASK = "TASK",
    SPRINT = "SPRINT",
    PROJECT = "PROJECT",
}