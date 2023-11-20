import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: Role;
    avatar?: string;
    avatarPublicId?: string; // Cloudinary public id
    createdAt?: Date;
    updatedAt?: Date;

    // Methods
    matchPassword(password: string): Promise<boolean>;
    hasPasswordChanged(): boolean;
}

enum Role {
    PROJECT_MANAGER = "Project Manager",
    DEVELOPER = "Developer",
    QA = "QA",
    UI_UX_DESIGNER = "UI/UX Designer",
    GUEST = "Guest"
}

export interface IUserRequest extends Request {
    user: IUser;
}