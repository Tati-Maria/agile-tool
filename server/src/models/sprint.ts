import {model, Schema} from 'mongoose';
import { ISprint } from '../types/sprint';

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
    await sprint.model('Task').deleteMany({sprint: sprint._id});
    next();
});

const Sprint = model<ISprint>('Sprint', sprintSchema);
export default Sprint;