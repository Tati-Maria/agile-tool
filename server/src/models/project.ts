import { IProject } from "../types/project-interface";
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
    userStories: [{
        type: Schema.Types.ObjectId,
        ref: "UserStory",
        required: false,
    }],
}, {
    timestamps: true,
});

const Project = model<IProject>("Project", projectSchema);
export default Project;