import { Document } from "mongoose";
import { IUser } from "./user-interface";

export interface ILogEntry extends Document {
    user: IUser;
    action: ActivityAction;
    details: string;
    entity: ActivityEntity
    timestamp: Date;
}

enum ActivityAction {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    JOIN = "JOIN",
    LEAVE = "LEAVE",
    ADD = "ADD",
    REMOVE = "REMOVE",
    UPLOAD = "UPLOAD",
    DOWNLOAD = "DOWNLOAD",
    START = "START",
    FINISH = "FINISH",
    PAUSE = "PAUSE",
    RESUME = "RESUME",
    RESTART = "RESTART",
    CANCEL = "CANCEL",
    COMPLETE = "COMPLETE",
    INCOMPLETE = "INCOMPLETE",
    ARCHIVE = "ARCHIVE",
    RESTORE = "RESTORE",
}

enum ActivityEntity {
    TASK = "TASK",
    SPRINT = "SPRINT",
    PROJECT = "PROJECT",
    USER_STORY = "USER_STORY",
}