import UserStory from '../models/user-story';
import asyncHandler from 'express-async-handler';
import { IUserRequest } from '../types/user-interface';
import { Response } from 'express';
import Project from '../models/project';
import Activity from '../models/activity-log';

// @desc    Create a new user story
// @route   POST /api/user-stories
// @access  Private
const createUserStory = asyncHandler(async (req: IUserRequest, res: Response) => {
    const {name, description, project, acceptanceCriteria, estimationPoints} = req.body;

    const projectExists = await Project.findById(project).exec();
    if(!projectExists) {
        res.status(404);
        throw new Error('Project not found');
    }

    const userStory = await UserStory.create({
        name,
        description,
        project,
        acceptanceCriteria,
        estimationPoints,
        tasks: [],
    });

    await Activity.create({
        user: req.user?._id,
        action: 'created',
        details: `created a new user story: ${userStory.name}`,
        entity: 'user story',
        entityId: userStory._id,
    });

    res.status(201).json({
        message: 'User story created successfully',
        name: userStory.name,
        _id: userStory._id,
    });
});

// @desc    Update a user story
// @route   PUT /api/user-stories/:id
// @access  Private
const updateUserStory = asyncHandler(async (req: IUserRequest, res: Response) => {
    const userStory = await UserStory.findById(req.params.id).exec();
    if(!userStory) {
        res.status(404);
        throw new Error('User story not found');
    } else {
        const {name, description, acceptanceCriteria, estimationPoints} = req.body;
        userStory.name = name || userStory.name;
        userStory.description = description || userStory.description;
        userStory.acceptanceCriteria = acceptanceCriteria || userStory.acceptanceCriteria;
        userStory.estimationPoints = estimationPoints || userStory.estimationPoints;

        await userStory.save();

        await Activity.create({
            user: req.user?._id,
            action: 'updated',
            details: `updated user story: ${userStory.name}`,
            entity: 'user story',
            entityId: userStory._id,
        });

        res.status(200).json({
            message: 'User story updated successfully',
            name: userStory.name,
            _id: userStory._id,
        });
    }
});

// @desc    Delete a user story
// @route   DELETE /api/user-stories/:id
// @access  Private
const deleteUserStory = asyncHandler(async (req: IUserRequest, res: Response) => {
    const userStory = await UserStory.findByIdAndDelete(req.params.id).exec();
    if(!userStory) {
        res.status(404);
        throw new Error('User story not found');
    } 

    await Activity.create({
        user: req.user?._id,
        action: 'deleted',
        details: `deleted user story: ${userStory?.name}`,
        entity: 'user story',
        entityId: userStory?._id,
    });

    res.status(200).json({
        message: 'User story deleted successfully',
    });
});

// @desc Get a user story by id
// @route GET /api/user-stories/:id
// @access Private
const getUserStoryById = asyncHandler(async (req: IUserRequest, res: Response) => {
    const userStory = await UserStory.findById(req.params.id).exec();
    if(!userStory) {
        res.status(404);
        throw new Error('User story not found');
    } else {
        res.status(200).json({
            message: 'User story found',
            userStory,
        });
    }
});

// @desc Get all user stories in a project
// @route GET /api/user-stories/project/:id
// @access Private
const getUserStoriesByProjectId = asyncHandler(async (req: IUserRequest, res: Response) => {
    const userStories = await UserStory.find({project: req.params.id}).exec();
    if(!userStories) {
        res.status(404);
        throw new Error('User stories not found');
    } else {
        res.status(200).json({
            message: 'User stories found',
            userStories,
        });
    }
});

// @desc Search for user stories
// @route GET /api/user-stories/search/:searchTerm
// @access Private
const searchUserStories = asyncHandler(async (req: IUserRequest, res: Response) => {
    const {searchTerm} = req.params;
    const userStories = await UserStory.find({name: {$regex: searchTerm, $options: 'i'}}).exec();
    if(!userStories) {
        res.status(404);
        throw new Error('User stories not found');
    } else {
        res.status(200).json({
            message: 'User stories found',
            userStories,
        });
    }
})

export {createUserStory, updateUserStory, deleteUserStory, getUserStoryById, getUserStoriesByProjectId, searchUserStories};