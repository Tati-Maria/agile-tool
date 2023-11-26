import { IProject } from "../types/project-interface";
import Task from "./task";
import Sprint from "./sprint";
import Activity from "./activity-log";
import Attachment from "./attachment";
import User from "./user";

import { model, Schema } from "mongoose";

const projectSchema: Schema = new Schema<IProject>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: false,
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true,
    },
    logo: {
        type: String,
        required: false,
    },
    logoPublicId: {
        type: String,
        required: false,
    },
    accessCode: {
        type: String,
        required: false,
    },
    team: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sprints: [{
        type: Schema.Types.ObjectId,
        ref: "Sprint",
        required: false,
    }],
    attachments: [{
        type: String,
        required: false,
    }],
    activityLog: [{
        type: Schema.Types.ObjectId,
        ref: "Activity",
        required: false,
    }],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: false,
    }],
}, {
    timestamps: true,
});

projectSchema.pre("deleteOne", {document: true}, async function (next) {
    const project = this as IProject;
    await Task.deleteMany({projectId: project._id});
    await Sprint.deleteMany({projectId: project._id});
    await Activity.deleteMany({projectId: project._id});
    await Attachment.deleteMany({projectId: project._id});
    await User.updateMany({projects: project._id}, {$pull: {projects: project._id}});
    next();
});

const Project = model<IProject>("Project", projectSchema);
export default Project;