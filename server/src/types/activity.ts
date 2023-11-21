import { Document } from "mongoose";
import { IUser } from "./user-interface";

export interface ILogEntry extends Document {
    user: IUser;
    action: string;
    details: string;
    timestamp: Date;
}