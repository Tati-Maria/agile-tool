import Sprint from '../models/sprint';
import Activity from "../models/activity-log"
import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserRequest } from '../types/user-interface';
import Task from '../models/task';

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
            projectId: project,
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
                projectId: updatedSprint?.project,
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
        projectId: sprint?.project,
    });

    res.status(200).json({
        message: 'Sprint deleted successfully',
    });
});

// @desc Get a sprint by id
// @route GET /api/sprints/:id
// @access Private
const getSprintById = asyncHandler(async (req: IUserRequest, res: Response) => {
    const sprint = await Sprint.findById(req.params.id)
      .populate({
        path: 'tasks',
        select:
          'name status priority description createdAt updatedAt assignedTo dueDate comments',
        populate: {
          path: 'assignedTo',
          select: 'name email avatar role',
        },
      })
      .populate('project', 'name startDate endDate')
      .exec();
    if(!sprint) {
        res.status(404);
        throw new Error('Sprint not found');
    } else {
        res.status(200).json(sprint);
    }
});

// @desc Get all sprints in a project
// @route GET /api/sprints/project/:id
// @access Private
const getSprintsByProject = asyncHandler(async (req: IUserRequest, res: Response) => {
    const sprints = await Sprint.find({project: req.params.id})
    .populate({
        path: "tasks",
        select: "name status priority description createdAt updatedAt assignedTo dueDate comments",
        populate: {
            path: "assignedTo",
            select: "name email avatar role",
        },
    }).populate("project", "name startDate endDate")
    .sort({startDate: 1}).exec();
    if(!sprints) {
        res.status(404);
        throw new Error('No sprints found');
    } else {
        res.status(200).json(sprints);
    }
});

// @desc Add a task to a sprint
// @route PATCH /api/sprints/:id/add-task
// @access Private
const addTaskToSprint = asyncHandler(async (req: IUserRequest, res: Response) => {
    //add multiple tasks to sprint
    const sprint = await Sprint.findById(req.params.id).exec();
    if(!sprint) {
        res.status(404);
        throw new Error('Sprint not found');
    } else {
        const {tasks} = req.body;
        const tasksToAdd = await Task.find({_id: {$in: tasks}}).exec();
        if(!tasksToAdd) {
            res.status(404);
            throw new Error('Tasks not found');
        } else {
            if(tasksToAdd.length === 0) {
                res.status(400);
                throw new Error('No tasks to add');
            } else {
                if(tasksToAdd.some((task) => sprint.tasks.includes(task._id))) {
                    res.status(400);
                    throw new Error('One or more tasks already in sprint');
                } else {
                    sprint.tasks.push(...tasksToAdd.map((task) => task._id));
                    await sprint.save();
                    await Activity.create({
                        user: req.user?._id,
                        action: 'added',
                        details:`${tasksToAdd.length} tasks were added to sprint: ${sprint.name}`,
                        entity: 'sprint',
                        entityId: sprint._id,
                        projectId: sprint.project,
                    });

                    res.status(200).json({
                        message: 'Tasks added to sprint successfully',
                        name: sprint.name,
                        _id: sprint._id,
                    })
                }
            }
        }
    }
});

// @desc Remove a task from a sprint
// @route PATCH /api/sprints/:id/remove-task
// @access Private
const removeTaskFromSprint = asyncHandler(async (req: IUserRequest, res: Response) => {
    const sprint = await Sprint.findById(req.params.id).exec();
    if(!sprint) {
        res.status(404);
        throw new Error('Sprint not found');
    } else {
        const {task} = req.body;
        const taskExists = await Task.findById(task).exec();
        if(!taskExists) {
            res.status(404);
            throw new Error('Task not found');
        }
        const index = sprint.tasks.indexOf(task);
        if(index > -1) {
            sprint.tasks.splice(index, 1);
        } else {
            res.status(404);
            throw new Error('Task not found in sprint');
        }

        await Activity.create({
            user: req.user?._id,
            action: 'removed',
            details: `task ${taskExists.name} was removed from sprint: ${sprint.name}`,
            entity: 'sprint',
            entityId: sprint._id,
            projectId: sprint.project,
        });

        await sprint.save();
        res.status(200).json({
            message: 'Task removed from sprint successfully',
            name: sprint.name,
            _id: sprint._id,
        });
    }
});

export {createSprint, updateSprint, deleteSprint, getSprintById, getSprintsByProject, addTaskToSprint, removeTaskFromSprint};