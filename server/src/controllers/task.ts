import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Task from '../models/task';
import Sprint from '../models/sprint';
import Project from '../models/project';
import User from '../models/user';
import Activity from '../models/activity-log';
import { IUserRequest } from '../types/user-interface';

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private

const createTask = asyncHandler(async (req: Request, res: Response) => {
    const {name, description, status, priority, dueDate, assignedTo, sprint} = req.body;

    if(new Date(dueDate) < new Date()) {
        res.status(400);
        throw new Error('Due date cannot be in the past');
    } else if (status === 'Done' && !dueDate) {
        res.status(400);
        throw new Error('Due date is required for completed tasks');
    } else if (status === 'Done' && new Date(dueDate) > new Date()) {
        // Ensure that the due date is in the past if the task is marked as done
        res.status(400);
        throw new Error('Due date cannot be in the future');
    } else if (status === 'Done' && !assignedTo) {
        res.status(400);
        throw new Error('Assigned user is required for completed tasks');
    }

    // Ensure that the sprint exists and is part of a project
    const projectExists = await Project.exists({sprints: sprint});
    if(!projectExists) {
        res.status(404);
        throw new Error('Project not found');
    }

    const sprintExists = await Sprint.exists({_id: sprint});
    if(!sprintExists) {
        res.status(404);
        throw new Error('Sprint not found');
    } else {
        const sprintData = await Sprint.findById(sprint).exec();
        if(!sprintData) {
            res.status(404);
            throw new Error('Sprint not found');
        }
        if(new Date(dueDate) > sprintData.endDate) {
            res.status(400);
            throw new Error('Due date cannot be after the sprint end date');
        } else if (new Date(dueDate) < sprintData.startDate) {
            res.status(400);
            throw new Error('Due date cannot be before the sprint start date');
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

            res.status(201).json({
                message: 'Task created successfully',
                name: task.name,
                _id: task._id,
            })
        }
    } 
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private

const updateTask = asyncHandler(async (req: Request, res: Response) => {
    const task = await Task.findById(req.params.id).exec();

    if(!task) {
        res.status(404);
        throw new Error('Task not found');
    } else {
        const {name, description, status, priority, dueDate, assignedTo} = req.body;

        if(new Date(dueDate) < new Date()) {
            res.status(400);
            throw new Error('Due date cannot be in the past');
        } else if (status === 'Done' && !dueDate) {
            res.status(400);
            throw new Error('Due date is required for completed tasks');
        } else if (status === 'Done' && new Date(dueDate) > new Date()) {
            // Ensure that the due date is in the past if the task is marked as done
            res.status(400);
            throw new Error('Due date cannot be in the future');
        } else if (status === 'Done' && !assignedTo) {
            res.status(400);
            throw new Error('Assigned user is required for completed tasks');
        }

        task.name = name || task.name;
        task.description = description || task.description;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.dueDate = dueDate || task.dueDate;
        task.assignedTo = assignedTo || task.assignedTo;

        await task.save();
        res.status(200).json({
            message: 'Task updated successfully',
            name: task.name,
            _id: task._id,
        });
    }
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private

const deleteTask = asyncHandler(async (req: Request, res: Response) => {
    const task = await Task.findByIdAndDelete(req.params.id).exec();
    if(!task) {
        res.status(404);
        throw new Error('Task not found');
    } else {
        res.status(200).json({
            message: 'Task deleted successfully',
            name: task.name,
            _id: task._id,
        });
    }
});

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private

const getTasks = asyncHandler(async (req: Request, res: Response) => {
    const tasks = await Task.find({}).exec();
    res.status(200).json(tasks);
});

// @desc    Get a task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = asyncHandler(async (req: Request, res: Response) => {
    const task = await Task.findById(req.params.id).exec();
    if(!task) {
        res.status(404);
        throw new Error('Task not found');
    } else {
        res.status(200).json(task);
    }
});

// @desc Update a task's status
// @route PATCH /api/tasks/:id/status
// @access Private
const updateTaskStatus = asyncHandler(async (req: Request, res: Response) => {
    const task = await Task.findById(req.params.id).exec();
    if(!task) {
        res.status(404);
        throw new Error('Task not found');
    } else {
        const {status} = req.body;
        task.status = status || task.status;
        await task.save();
        res.status(200).json({
            message: 'Task updated successfully',
            name: task.name,
            _id: task._id,
        });
    }
});

// @desc Search for sprint tasks
// @route GET /api/tasks/search
// @access Private
const searchTasks = asyncHandler(async (req: Request, res: Response) => {
    const {query} = req.query;
    const tasks = await Task.find({name: {$regex: query, $options: 'i'}}).exec();
    res.status(200).json(tasks);
});

// @desc assign a task to a member
// @route PATCH /api/tasks/:id/assign
// @access Private
const assignTask = asyncHandler(async (req: IUserRequest, res: Response) => {
    const task = await Task.findById(req.params.id).exec();
    const {assignedTo} = req.body;

    if(!task) {
        res.status(404);
        throw new Error('Task not found');
    } else {
        const userExists = await User.exists({_id: assignedTo});
        if(!userExists) {
            res.status(404);
            throw new Error('User not found');
        }
        task.assignedTo = assignedTo || task.assignedTo;
        await task.save();

        await Activity.create({
            user: req.user?._id,
            action: 'updated',
            details: `assigned task: ${task.name} to ${task.assignedTo}`,
            entity: 'task',
            entityId: task._id,
        });

        res.status(200).json({
            message: 'Task updated successfully',
            name: task.name,
            _id: task._id,
        });
    }
});

export {createTask,searchTasks, updateTask, deleteTask, getTasks, getTaskById, updateTaskStatus, assignTask};