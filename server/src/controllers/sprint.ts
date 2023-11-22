import Sprint from '../models/sprint';
import Activity from "../models/activity-log"
import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserRequest } from '../types/user-interface';

// @desc    Create a new sprint
// @route   POST /api/sprints
// @access  Private
const createSprint = asyncHandler(async (req: IUserRequest, res: Response) => {
    const {name, startDate, endDate, project, goal} = req.body;

    if(new Date(endDate) < new Date(startDate)) {
        res.status(400);
        throw new Error('End date cannot be before start date');
    } else if (new Date(endDate) < new Date()) {
        res.status(400);
        throw new Error('End date cannot be in the past');
    } else {
        const sprint = await Sprint.create({
            name,
            startDate,
            endDate,
            project,
            goal,
            tasks: [],
        });

        await Activity.create({
            user: req.user?._id,
            action: 'created',
            details: `created a new sprint: ${sprint.name}`,
            entity: 'sprint',
            entityId: sprint._id,
        })

        res.status(201).json({
            message: 'Sprint created successfully',
            name: sprint.name,
            _id: sprint._id,
        });
    }
});

// @desc    Update a sprint
// @route   PUT /api/sprints/:id
// @access  Private
const updateSprint = asyncHandler(async (req: IUserRequest, res: Response) => {
    const sprint = await Sprint.findById(req.params.id).exec();
    if(!sprint) {
        res.status(404);
        throw new Error('Sprint not found');
    } else {
        const {name, startDate, endDate, goal} = req.body;
        if(new Date(endDate) < new Date(startDate)) {
            res.status(400);
            throw new Error('End date cannot be before start date');
        } else if (new Date(endDate) < new Date()) {
            res.status(400);
            throw new Error('End date cannot be in the past');
        } else {
            const updatedSprint = await Sprint.findByIdAndUpdate(req.params.id, {
                name,
                startDate,
                endDate,
                goal,
            }, {new: true}).exec();

            await Activity.create({
                user: req.user?._id,
                action: 'updated',
                details: `updated sprint: ${updatedSprint?.name}`,
                entity: 'sprint',
                entityId: updatedSprint?._id,
            })

            res.status(200).json({
                message: 'Sprint updated successfully',
                name: updatedSprint?.name,
                _id: updatedSprint?._id,
            });
        }
    }
});

// @desc    Delete a sprint
// @route   DELETE /api/sprints/:id
// @access  Private
const deleteSprint = asyncHandler(async (req: IUserRequest, res: Response) => {
    const sprint = await Sprint.findByIdAndDelete(req.params.id).exec();
    if(!sprint) {
        res.status(404);
        throw new Error('Sprint not found');
    } 

    await Activity.create({
        user: req.user?._id,
        action: 'deleted',
        details: `deleted sprint: ${sprint?.name}`,
        entity: 'sprint',
        entityId: sprint?._id,
    });

    res.status(200).json({
        message: 'Sprint deleted successfully',
    });
});

// @desc Get a sprint by id
// @route GET /api/sprints/:id
// @access Private
const getSprintById = asyncHandler(async (req: IUserRequest, res: Response) => {
    const sprint = await Sprint.findById(req.params.id).exec();
    if(!sprint) {
        res.status(404);
        throw new Error('Sprint not found');
    } else {
        res.status(200).json({
            message: 'Sprint found',
            sprint,
        });
    }
});

// @desc Get all sprints in a project
// @route GET /api/sprints/project/:id
// @access Private
const getSprintsByProject = asyncHandler(async (req: IUserRequest, res: Response) => {
    const sprints = await Sprint.find({project: req.params.id}).exec();
    if(!sprints) {
        res.status(404);
        throw new Error('No sprints found');
    } else {
        res.status(200).json({
            message: 'Sprints found',
            sprints,
        });
    }
});

export {createSprint, updateSprint, deleteSprint, getSprintById, getSprintsByProject};