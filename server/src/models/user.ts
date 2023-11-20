import {model, Schema} from "mongoose";
import { IUser } from "types/user-interface";

const userSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false,
  },
  avatar: {
    type: String,
    required: false,
    default:
      'https://asset.cloudinary.com/daqlugqgc/75534e2071339a8c7c3341fdd49cb589',
  },
  avatarPublicId: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const User = model<IUser>('User', userSchema);
export default User;