import {model, Schema} from 'mongoose';
import { ISprint } from '../types/sprint';
import Task from './task';
import Project from './project';

const sprintSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: false,
    },
    endDate: {
        type: Date,
        required: false,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    goal: {
        type: String,
        required: false,
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: false,
    }],
},  {timestamps: true});

sprintSchema.pre("deleteOne", {document: true}, async function (next) {
    const sprint = this as ISprint;
    await Task.deleteMany({sprint: sprint._id});
    await Project.updateOne({_id: sprint.project}, {$pull: {sprints: sprint._id}});
    next();
});

const Sprint = model<ISprint>('Sprint', sprintSchema);
export default Sprint;