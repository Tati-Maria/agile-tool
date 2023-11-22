import {model, Schema} from 'mongoose';

const commentSchema: Schema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },
}, {timestamps: true});

const Comment = model('Comment', commentSchema);
export default Comment;