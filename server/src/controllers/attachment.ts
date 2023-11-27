import asyncHandler from 'express-async-handler';
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import crypto from 'crypto';
import { Response } from 'express';
import Attachment from '../models/attachment';
import { IUserRequest } from '../types/user-interface';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { config } from 'dotenv';
config();

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// @desc    Upload attachment
// @route   POST /api/attachments
// @access  Private

/*
before saving the attachment to the db
we must check if the type is File or Image or Link
if it's a file, we must upload it to the s3 bucket
if it's an image, we must upload it to the s3 bucket
if it's a link, we just save it to the db
*/

export const uploadAttachment = asyncHandler(async(req: IUserRequest, res: Response) => {
    const {projectId, description, type, url} = req.body;
    if(type === "File" || type === "Image") {
        const file = req.file;
        const imageName = randomImageName();

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: imageName,
            Body: file?.buffer,
            ContentType: file?.mimetype,
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        const attachment = new Attachment({
            projectId,
            description,
            name: imageName,
            createdBy: req.user?._id,
            type,
        });

        const createdAttachment = await attachment.save();
        res.status(201).json(createdAttachment);
    
    } else if(type === "Link") {
        const attachment = new Attachment({
            projectId,
            description,
            name: url,
            createdBy: req.user?._id,
            url,
            type,
        });

        const createdAttachment = await attachment.save();
        res.status(201).json(createdAttachment);
    }
  
});

// @desc get all project attachments
// @route GET /api/attachments/:projectId
// @access Private
export const getProjectAttachments = asyncHandler(async(req: IUserRequest, res: Response) => {
    const attachments = await Attachment.find({projectId: req.params.projectId});
    for(const attachment of attachments) {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: attachment.name,
        });
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        attachment.url = url;
        await attachment.save();
    }

    res.json(attachments);
});

// @desc get attachment by id
// @route GET /api/attachments/:id
// @access Private
export const getAttachmentById = asyncHandler(async(req: IUserRequest, res: Response) => {
    const attachment = await Attachment.findById(req.params.id);
    if(attachment) {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: attachment.name,
        });
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hours
        attachment.url = url;
        await attachment.save();
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
    const attachment = await Attachment.findById(req.params.id);
    if(!attachment) {
        res.status(404);
        throw new Error('Attachment not found');
    } else {
        if(attachment.createdBy.toString() !== req.user?._id.toString()) {
            res.status(401);
            throw new Error('Not authorized');
        } else {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: attachment.name,
            }
            const command = new DeleteObjectCommand(params);
            await s3Client.send(command);

            await attachment.deleteOne();
            res.status(200).json({message: 'Attachment deleted'});
        }
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
            attachment.description = req.body.description || attachment.description;

            const updatedAttachment = await attachment.save();
            res.status(200).json(updatedAttachment);
        }
    }

});

// @desc get user attachments
// @route GET /api/attachments/user/:userId
// @access Private
export const getUserAttachments = asyncHandler(async(req: IUserRequest, res: Response) => {
    const attachments = await Attachment.find({createdBy: req.params.userId});
    for(const attachment of attachments) {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: attachment.name,
        });
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        attachment.url = url;
        await attachment.save();
    }

    res.status(200).json(attachments);
});