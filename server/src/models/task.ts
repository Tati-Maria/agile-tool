import {model, Schema} from 'mongoose';
import {ITask} from '../types/tasks';

const taskSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['To Do', 'In Progress', "Done", "Quality Check"],
        default: 'To Do'
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    dueDate: {
        type: Date,
        required: false,
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: false,
    }],
    sprint: {
        type: Schema.Types.ObjectId,
        ref: "Sprint",
        required: false,
    },
},  {timestamps: true});

taskSchema.pre("deleteOne", {document: true}, async function (next) {
    const task = this as ITask;
    await task.model('Comment').deleteMany({task: task._id});
    next();
});

const Task = model<ITask>('Task', taskSchema);
export default Task;