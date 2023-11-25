import UserStory from '../models/user-story';
import asyncHandler from 'express-async-handler';
import { IUserRequest } from '../types/user-interface';
import { Response } from 'express';
import Project from '../models/project';
import Activity from '../models/activity-log';
import Task from '../models/task';
import { ITask } from '../types/tasks';

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
        projectId: userStory?.project,
    });
});

// @desc Get a user story by id
// @route GET /api/user-stories/:id
// @access Private
const getUserStoryById = asyncHandler(async (req: IUserRequest, res: Response) => {
    const userStory = await UserStory.findById(req.params.id)
    .populate({
        path: "tasks",
        select: "name status priority dueDate description createdAt updatedAt assignedTo",
        populate: {
            path: "assignedTo",
            select: "name email avatar role",
        }
    }).populate("project", "name startDate endDate").exec();

    if(!userStory) {
        res.status(404);
        throw new Error('User story not found');
    } else {
        res.status(200).json(userStory);
    }
});

// @desc Get all user stories in a project
// @route GET /api/user-stories/project/:id
// @access Private
const getUserStoriesByProjectId = asyncHandler(async (req: IUserRequest, res: Response) => {
    const userStories = await UserStory.find({project: req.params.id})
    .populate({
        path: "tasks",
        select: "name status priority description dueDate createdAt updatedAt assignedTo comments",
        populate: {
            path: "assignedTo",
            select: "name email avatar role",
        }
    }).populate("project", "name startDate endDate").exec();
    if(!userStories) {
        res.status(404);
        throw new Error('User stories not found');
    } else {
        res.status(200).json(userStories);
    }
});

// @desc Search for user stories
// @route GET /api/user-stories/search/:searchTerm
// @access Private
const searchUserStories = asyncHandler(async (req: IUserRequest, res: Response) => {
    const {projectId, searchTerm} = req.query;

    const userStories = await UserStory.find({project: projectId, name: {$regex: searchTerm, $options: 'i'}}).exec();

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

// @desc    Add a task to a user story
// @route   PATCH /api/user-stories/:id/add-task
// @access  Private
const addTaskToUserStory = asyncHandler(async (req: IUserRequest, res: Response) => {
    const {name, description, status, priority, dueDate, assignedTo, sprint} = req.body;
    const userStory = await UserStory.findById(req.params.id).exec();
    if(!userStory) {
        res.status(404);
        throw new Error('User story not found');
    } else {
        const task = await Task.create({
            name,
            description,
            status,
            priority,
            dueDate,
            assignedTo,
            sprint,
        });

        userStory.tasks.push(task._id);
        await userStory.save();

        await Activity.create({
            user: req.user?._id,
            action: 'updated',
            details: `${task.name} was added to user story: ${userStory.name}`,
            entity: 'user story',
            entityId: userStory._id,
        }); 

        res.status(200).json({
            message: 'Task added to user story successfully',
            name: userStory.name,
            _id: userStory._id,
            projectId: userStory.project,
        });
    }
});

// @desc    Remove a task from a user story
// @route   PATCH /api/user-stories/:id/remove-task
// @access  Private
const removeTaskFromUserStory = asyncHandler(async (req: IUserRequest, res: Response) => {
    const userStory = await UserStory.findById(req.params.id).exec();
    if(!userStory) {
        res.status(404);
        throw new Error('User story not found');
    } else {
        const {task} = req.body;
        const taskExists = await Task.findById(task).exec();
        if(!taskExists) {
            res.status(404);
            throw new Error('Task not found');
        }
        userStory.tasks = userStory.tasks.filter((t: ITask) => t._id !== task);
        await userStory.save();

        await Activity.create({
            user: req.user?._id,
            action: 'updated',
            details: `${taskExists.name} was removed from user story: ${userStory.name}`,
            entity: 'user story',
            entityId: userStory._id,
        });

        res.status(200).json({
            message: 'Task removed from user story successfully',
            name: userStory.name,
            _id: userStory._id,
        });
    }
});

export {createUserStory, updateUserStory, deleteUserStory, getUserStoryById, getUserStoriesByProjectId, searchUserStories, addTaskToUserStory, removeTaskFromUserStory};