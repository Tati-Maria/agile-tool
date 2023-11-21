/* eslint-disable @typescript-eslint/no-explicit-any */
import asyncHandler from 'express-async-handler';
import crypto from 'crypto-js';
import { Request, Response } from 'express';
import Project from '../models/project';
import User from '../models/user';
import { IUserRequest } from 'types/user-interface';
import { uploadLogo, deleteLogo } from '../utils/cloudinary';

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private

const createProject = asyncHandler(async (req: IUserRequest, res: Response) => {
  const {
    name,
    description,
    startDate,
    endDate,
    isActive,
    logo,
  } = req.body;

    const result: any = await uploadLogo(logo);
    const accessCode = crypto.lib.WordArray.random(10).toString();

    const project = await Project.create({
        name,
        description,
        startDate,
        endDate,
        isActive,
        logo: result.secure_url,
        logoPublicId: result.public_id,
        accessCode,
        team: [req.user?._id],
        owner: req.user?._id,
        sprints: [],
        attachments: [],
        activityLog: [],
        userStories: [],
    });

    res.status(201).json({
        message: 'Project created successfully',
        name: project.name,
        _id: project._id,
    })
});

// @desc On board a new user to a project
// @route POST /api/projects/onboard
// @access Private

const onboardUser = asyncHandler(async (req: IUserRequest, res: Response) => {
    const { accessCode } = req.body;

    const project = await Project.findOne({ accessCode }).exec();
    if(!project) {
        res.status(404);
        throw new Error('Project not found');
    }

    if (project.team.includes(req.user?._id as any)) {
      res.status(400);
      throw new Error('You are already a member of this project');
    }

    project.team.push(req.user?._id as any);
    await project.save();
    res.status(200).json({
        message: 'You have been added to the project successfully',
        name: project.name,
        _id: project._id,
    });
});

// @desc Get all projects
// @route GET /api/projects
// @access Private
const getProjects = asyncHandler(async (req: IUserRequest, res: Response) => {
    const projects = await Project.find({ team: req.user?._id })
    .sort({ createdAt: -1 })
    .populate('team', 'name avatar role email')
    .populate('owner', 'name avatar role email')
    .populate('sprints')
    .populate('userStories')
    .populate('activityLog')
    .populate('attachments')
    .exec();

    res.status(200).json(projects);
});

// @desc Get a single project
// @route GET /api/projects/:id
// @access Private
const getProject = asyncHandler(async (req: Request, res: Response) => {
    const project = await Project.findById(req.params.id)
    .populate('team', 'name avatar role email')
    .populate('owner', 'name avatar role email')
    .populate('sprints')
    .populate('userStories')
    .populate('activityLog')
    .populate('attachments')
    .exec();

    if(!project) {
        res.status(404);
        throw new Error('Project not found');
    }

    res.status(200).json(project);
});

// @desc Update a project
// @route PUT /api/projects/:id
// @access Private
const updateProject = asyncHandler(async (req: Request, res: Response) => {
    const project = await Project.findById(req.params.id).exec();
    if(!project) {
        res.status(404);
        throw new Error('Project not found');
    }

    const {
        name,
        description,
        startDate,
        endDate,
        isActive,
        logo,
    } = req.body;

    if (logo) {
        const result: any = await uploadLogo(logo);
        await deleteLogo(project.logoPublicId);
        project.logo = result.secure_url;
        project.logoPublicId = result.public_id;
    }

    project.name = name || project.name;
    project.description = description || project.description;
    project.startDate = startDate || project.startDate;
    project.endDate = endDate || project.endDate;
    project.isActive = isActive || project.isActive;

    await project.save();
    res.status(200).json({
        message: 'Project updated successfully',
        name: project.name,
        _id: project._id,
    });
});

// @desc Delete a project
// @route DELETE /api/projects/:id
// @access Private

const deleteProject = asyncHandler(async (req: Request, res: Response) => {
    const project = await Project.findByIdAndDelete(req.params.id).exec();
    if(!project) {
        res.status(404);
        throw new Error('Project not found');
    }

    await deleteLogo(project.logoPublicId);
    res.status(200).json({
        message: 'Project deleted successfully',
        name: project.name,
        _id: project._id,
    });
});

// @desc Get all users in a project
// @route GET /api/projects/:id/team
// @access Private

const getTeam = asyncHandler(async (req: Request, res: Response) => {
    const project = await Project.findById(req.params.id).exec();
    if(!project) {
        res.status(404);
        throw new Error('Project not found');
    }

    const team = await User.find({ _id: { $in: project.team } })
    .sort({ createdAt: -1 })
    .exec();

    res.status(200).json(team);
});

export { createProject, onboardUser, getProjects, getProject, updateProject, deleteProject, getTeam };