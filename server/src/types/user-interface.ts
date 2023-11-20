import { Request } from "express";
import { Document } from "mongoose";

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
}

export interface IUserRequest extends Request {
    user?: IUser;
}