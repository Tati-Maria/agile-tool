import {IUserRequest} from '../types/user-interface';
import asyncHandler from 'express-async-handler';
import {Response} from 'express';   
import Comment from '../models/comments';
import Task from '../models/task';

// @desc    Create a new comment
// @route   POST /api/comments
// @access  Private
const createComment = asyncHandler(async (req: IUserRequest, res: Response) => {
    const {content, task} = req.body;
    const taskExits = await Task.findById(task).exec();
    if(!taskExits) {
        res.status(404);
        throw new Error('Task not found');
    } else {
        const comment = new Comment({
            content,
            task,
            createdBy: req.user?._id,
        });

        await comment.save();
        
        res.status(201).json({
            message: 'Comment created successfully',
            content: comment.content,
            _id: comment._id,
        });
    }
});

// @desc    Update a comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = asyncHandler(async (req: IUserRequest, res: Response) => {
    const comment = await Comment.findById(req.params.id).exec();
    if(!comment) {
        res.status(404);
        throw new Error('Comment not found');
    } else {
        const {content} = req.body;
        comment.content = content || comment.content;

        await comment.save();

        res.status(200).json({
            message: 'Comment updated successfully',
            content: comment.content,
            _id: comment._id,
        });
    }
});

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = asyncHandler(async (req: IUserRequest, res: Response) => {
    const comment = await Comment.findById(req.params.id).exec();
    if(!comment) {
        res.status(404);
        throw new Error('Comment not found');
    } else {
        await comment.deleteOne();
        res.status(200).json({
            message: 'Comment deleted successfully',
            _id: comment._id,
        });
    }
});

export {createComment, updateComment, deleteComment};