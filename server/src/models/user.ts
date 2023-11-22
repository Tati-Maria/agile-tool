import {model, Schema} from "mongoose";
import { IUser } from "types/user-interface";
import bycript from 'bcryptjs';

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
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: false,
  }],
  activityLog: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity',
    required: false,
  }],
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: false,
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    required: false,
  }],
  
}, {timestamps: true});

// Encrypt password before saving user
userSchema.pre<IUser>('save', async function (next) {
  if(!this.isModified('password')) next();
  const salt = await bycript.genSalt(10);
  this.password = await bycript.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bycript.compare(enteredPassword, this.password);
}

userSchema.pre("deleteOne", {document: true}, async function (next) {
  const user = this as IUser;
  await user.model('Project').deleteMany({owner: user._id});
  await user.model('Task').deleteMany({assignedTo: user._id});
  await user.model('Comment').deleteMany({author: user._id});
  await user.model('Activity').deleteMany({author: user._id});
  next();
});

const User = model<IUser>('User', userSchema);
export default User;