import {model, Schema} from 'mongoose';
import {ITask} from '../types/tasks';
import Comment from './comments';
import Project from './project';
import User from './user';


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
        enum: ['Backlog', 'To Do', 'In Progress', 'Testing', 'Done', 'Paused'],
        default: 'Backlog'
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Normal', 'High', 'Urgent'],
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
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Bug', 'Feature', 'Improvement', 'Refactor', 'Test', 'Other'],
        default: 'Bug'
    },
    resolution: {
        type: String,
        required: false,
        enum: ['Fixed', 'Duplicate', 'Invalid', 'Won\'t Fix', 'Works For Me', 'Unresolved', 'Other'],
        default: null
    },

},  {timestamps: true});

taskSchema.pre("deleteOne", {document: true}, async function (next) {
    const task = this as ITask;
    await Comment.deleteMany({taskId: task._id});
    await Project.updateOne({_id: task.projectId}, {$pull: {tasks: task._id}});
    await User.updateOne({_id: task.createdBy}, {$pull: {tasks: task._id}});
    await User.updateOne({_id: task.assignedTo}, {$pull: {tasks: task._id}});
    next();
});

const Task = model<ITask>('Task', taskSchema);
export default Task;