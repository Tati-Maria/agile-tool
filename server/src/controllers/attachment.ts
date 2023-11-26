import asyncHandler from 'express-async-handler';
import { Response } from 'express';
import Attachment from '../models/attachment';
import { IUserRequest } from '../types/user-interface';

// @desc    Upload attachment
// @route   POST /api/attachments
// @access  Private

export const uploadAttachment = asyncHandler(async(req: IUserRequest, res: Response) => {
    const {name, url, description, type, projectId} = req.body;

    const attachment = new Attachment({
        name,
        url,
        description,
        type,
        projectId,
        createdBy: req.user?._id,
    });

    const createdAttachment = await attachment.save();
    res.status(201).json(createdAttachment);
});

// @desc get all project attachments
// @route GET /api/attachments/:projectId
// @access Private
export const getProjectAttachments = asyncHandler(async(req: IUserRequest, res: Response) => {
    const attachments = await Attachment.find({projectId: req.params.projectId});
    res.json(attachments);
});

// @desc get attachment by id
// @route GET /api/attachments/:id
// @access Private
export const getAttachmentById = asyncHandler(async(req: IUserRequest, res: Response) => {
    const attachment = await Attachment.findById(req.params.id);
    if(attachment) {
        res.json(attachment);
    } else {
        res.status(404);
        throw new Error('Attachment not found');
    }
});

// @desc delete attachment
// @route DELETE /api/attachments/:id
// @access Private
export const deleteAttachment = asyncHandler(async(req: IUserRequest, res: Response) => {
    const attachment = await Attachment.findByIdAndDelete(req.params.id);
    if(attachment) {
        res.json({message: 'Attachment removed'});
    } else {
        res.status(404);
        throw new Error('Attachment not found');
    }
});

// @desc update attachment
// @route PUT /api/attachments/:id
// @access Private
export const updateAttachment = asyncHandler(async(req: IUserRequest, res: Response) => {
    const attachment = await Attachment.findById(req.params.id);
    if(!attachment) {
        res.status(404);
        throw new Error('Attachment not found');
    } else {
        if(attachment.createdBy.toString() !== req.user?._id.toString()) {
            res.status(401);
            throw new Error('Not authorized');
        } else {
            attachment.name = req.body.name || attachment.name;
            attachment.url = req.body.url || attachment.url;
            attachment.description = req.body.description || attachment.description;
            attachment.type = req.body.type || attachment.type;

            const updatedAttachment = await attachment.save();
            res.json(updatedAttachment);
        }
    }
});

// @desc get user attachments
// @route GET /api/attachments/user/:userId
// @access Private
export const getUserAttachments = asyncHandler(async(req: IUserRequest, res: Response) => {
    const attachments = await Attachment.find({createdBy: req.params.userId});
    res.json(attachments);
});