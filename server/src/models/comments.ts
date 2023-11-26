import {model, Schema} from 'mongoose';
import {IComment} from '../types/comment';
import User from './user';
import Task from './task';

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


commentSchema.pre("deleteOne", {document: true}, async function (next) {
    const comment = this as IComment;
    await User.updateOne({_id: comment.author}, {$pull: {comments: comment._id}});
    await Task.updateOne({_id: comment.task}, {$pull: {comments: comment._id}});
    next();
});

const Comment = model('Comment', commentSchema);
export default Comment;