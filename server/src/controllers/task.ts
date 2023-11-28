import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Task from '../models/task';
import Project from '../models/project';
import User from '../models/user';
import Activity from '../models/activity-log';
import { IUserRequest } from '../types/user-interface';

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private

const createTask = asyncHandler(async (req: IUserRequest, res: Response) => {
  const {
    name,
    description,
    status,
    priority,
    dueDate,
    assignedTo,
    sprint,
    resolution,
    type,
    projectId,
    comments,
    tags,
  } = req.body;

  if (new Date(dueDate) < new Date()) {
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
  const project = await Project.findById(projectId).exec();
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  } else if (project.isActive === false) {
    res.status(400);
    throw new Error('Tasks cannot be created for inactive projects');
  }

  //and if the project is active to create a task (only active projects can have tasks)
  const user = await User.findById(req.user?._id).exec();
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  } else if (!project.team.includes(user._id)) {
    res.status(400);
    throw new Error('User is not a member of this project');
  }

  // ensure that the task is not create before the project start date or after the end date
  if (new Date(dueDate) < new Date(project.startDate)) {
    res.status(400);
    throw new Error('Due date cannot be before project start date');
  } else if (new Date(dueDate) > new Date(project.endDate)) {
    res.status(400);
    throw new Error('Due date cannot be after project end date');
  }

  const newTask = await Task.create({
    name,
    description,
    status,
    priority,
    dueDate,
    assignedTo,
    sprint,
    resolution,
    type,
    project: projectId,
    comments,
    tags,
    createdBy: req.user?._id,
  });

  await Activity.create({
    user: req.user?._id,
    action: 'created',
    details: `created task: ${newTask.name}`,
    entity: 'task',
    entityId: newTask._id,
    projectId: projectId,
  });

  res.status(201).json({
    message: 'Task created successfully',
    name: newTask.name,
    _id: newTask._id,
  });
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private

const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id).exec();

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  } else {
    const { name, description, status, priority, dueDate, assignedTo } =
      req.body;

    if (new Date(dueDate) < new Date()) {
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
    task.type = req.body.type || task.type;
    task.resolution = req.body.resolution || task.resolution;
    task.tags = req.body.tags || task.tags;
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
  if (!task) {
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

// @desc Get project tasks
// @route GET /api/tasks/project/:id
// @access Private
const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await Task.find({ project: req.params.id })
    .populate({
      path: 'sprint',
      select: 'name startDate endDate goal project',
      populate: {
        path: 'project',
        select: 'name startDate endDate logo',
      },
    })
    .populate({
      path: 'assignedTo',
      select: 'name email avatar role',
    })
    .populate({
      path: 'createdBy',
      select: 'name email avatar role',
    })
    .sort({ status: 1, priority: 1, dueDate: 1 })
    .exec();

  res.status(200).json(tasks);
});

// @desc    Get a task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id)
    .populate({
      path: 'sprint',
      select: 'name startDate endDate goal project',
      populate: {
        path: 'project',
        select: 'name startDate endDate logo',
      },
    })
    .populate({
      path: 'assignedTo',
      select: 'name email avatar role',
    })
    .populate({
      path: 'createdBy',
      select: 'name email avatar role',
    }).
    populate({
      path: 'comments',
      select: 'content author task',
      populate: {
        path: 'author',
        select: 'name email avatar role',
      },
    })
    .exec();
  if (!task) {
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
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  } else {
    const { status } = req.body;
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
  const { query } = req.query;
  const tasks = await Task.find({
    name: { $regex: query, $options: 'i' },
  }).exec();
  res.status(200).json(tasks);
});

// @desc assign a task to a member
// @route PATCH /api/tasks/:id/assign
// @access Private
const assignTask = asyncHandler(async (req: IUserRequest, res: Response) => {
  const task = await Task.findById(req.params.id).exec();
  const { assignedTo } = req.body;

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  } else {
    const userExists = await User.exists({ _id: assignedTo });
    if (!userExists) {
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

export {
  createTask,
  searchTasks,
  updateTask,
  deleteTask,
  getTasks,
  getTaskById,
  updateTaskStatus,
  assignTask,
};
