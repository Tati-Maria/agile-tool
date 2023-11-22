import {model, Schema} from 'mongoose';

const userStorySchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    acceptanceCriteria: {
        type: String,
        required: false,
    },
    estimationPoints: {
        type: Number,
        required: false,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: false,
    }],
}, {timestamps: true});


const UserStory = model('UserStory', userStorySchema);
export default UserStory;