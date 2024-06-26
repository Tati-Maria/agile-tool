/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import asyncHandler from 'express-async-handler';
import crypto from 'crypto-js';
import { Request, Response } from 'express';
import Project from '../models/project';
import User from '../models/user';
import { IUserRequest } from '../types/user-interface';
import { uploadLogo, deleteLogo } from '../utils/cloudinary';
import Activity from '../models/activity-log';

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
    sprints,
    activityLog,
    tasks,
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
    sprints: sprints || [],
    activityLog: activityLog || [],
    tasks: tasks || [],
  });

  res.status(201).json({
    message: 'Project created successfully',
    name: project.name,
    _id: project._id,
  });
});

// @desc On board a new user to a project
// @route POST /api/projects/onboard
// @access Private
const onboardUser = asyncHandler(async (req: IUserRequest, res: Response) => {
  const { accessCode } = req.body;
  console.log(accessCode);
  const project = await Project.findOne({ 
    accessCode: accessCode
   }).exec();
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  } else {
    if (project.team.includes(req.user?._id!)) {
      res.status(400);
      throw new Error('You are already a member of this project');
    } else {
      project.team.push(req.user?._id!);
      await project.save();
      await Activity.create({
        user: req.user?._id,
        action: 'joined',
        details: `joined project: ${project.name}`,
        entity: 'project',
        entityId: project._id,
        projectId: project._id,
      });
      res.status(200).json({
        message: 'You have been added to the project successfully',
        name: project.name,
        _id: project._id,
      });
    }
  }
});

// @desc Get all projects
// @route GET /api/projects
// @access Private
const getProjects = asyncHandler(async (req: IUserRequest, res: Response) => {
  const projects = await Project.find({ team: req.user?._id })
    .sort({ createdAt: -1 })
    .populate('team', 'name avatar role email')
    .populate('owner', 'name avatar role email')
    .populate('sprints', 'name startDate endDate')
    .populate('tasks', 'name description status')
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
    .populate('sprints', 'name startDate endDate')
    .populate('tasks', 'name description status')
    .exec();

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  res.status(200).json(project);
});

// @desc Update a project
// @route PUT /api/projects/:id
// @access Private
const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findById(req.params.id)
    .populate('owner', 'name avatar role email')
    .exec();

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  const { name, description, startDate, endDate, isActive, logo } = req.body;

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

  await Activity.create({
    user: project.owner._id,
    action: 'updated',
    details: `updated project: ${project.name}`,
    entity: 'project',
    entityId: project._id,
    projectId: project._id,
  });

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
  if (!project) {
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
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  const team = await User.find({ _id: { $in: project.team } })
    .sort({ createdAt: -1 })
    .populate('team', 'name avatar role email')
    .exec();

  res.status(200).json(team);
});

// @desc Remove a user from a project
// @route DELETE /api/projects/:id/team/:userId
// @access Private
const removeUserFromProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Project.findById(req.params.id)
      .populate('team', 'name avatar role email')
      .exec();

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    if (project.owner.toString() === req.params.userId) {
      res.status(400);
      throw new Error('You cannot remove the project owner from the project');
    }

    if (!project.team.includes(req.params.userId)) {
      res.status(400);
      throw new Error('User is not a member of this project');
    }

    project.team = project.team.filter(
      (member: any) => member._id.toString() !== req.params.userId
    );
    await project.save();
    res.status(200).json({
      message: 'User removed from project successfully',
    });
  }
);

// @desc Make project inactive or active
// @route PATCH /api/projects/:id/active
// @access Private
const makeProjectActiveOrInactive = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const project = await Project.findById(req.params.id).exec();
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    } else if (project.owner._id.toString() !== req.user?._id.toString()) {
      res.status(401);
      throw new Error('You are not authorized to perform this action');
    } else {
      project.isActive = !project.isActive;
      const atictivity = await Activity.create({
        user: req.user?._id,
        action: project.isActive ? 'activated' : 'deactivated',
        details: `${
          project.isActive ? 'activated' : 'deactivated'
        } project: ${project.name}`,
        entity: 'project',
        entityId: project._id,
        projectId: project._id,
      });
      console.log(atictivity);
      await project.save();
      res.status(200).json({
        message: 'Project status updated successfully',
        isActive: project.isActive,
      });
    }
  }
);

// @desc generate access code for a project
// @route PATCH /api/projects/:id/access-code
// @access Private
const generateAccessCode = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const project = await Project.findById(req.params.id).exec();
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    } else if (project.owner._id.toString() !== req.user?._id.toString()) {
      res.status(401);
      throw new Error('You are not authorized to perform this action');
    } else {
      project.accessCode = crypto.lib.WordArray.random(10).toString();
      await project.save();
      res.status(200).json({
        message: 'Project access code updated successfully',
        accessCode: project.accessCode,
      });
    }
  }
);

// @desc Get project activity log
// @route GET /api/projects/:id/activity-log
// @access Private
const projectActivityLog = asyncHandler(async(req: Request, res: Response) => {
  const project = await Project.findById(req.params.id).exec();
  if(!project) {
    res.status(404);
    throw new Error('Project not found');
  } else {
    const activityLog = await Activity.find({projectId: project._id})
    .populate('user', 'name avatar role email')
    .populate('entityId', 'name')
    
    .sort({createdAt: -1})
    res.status(200).json(activityLog);
  }
})


export {
  createProject,
  onboardUser,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getTeam,
  removeUserFromProject,
  makeProjectActiveOrInactive,
  generateAccessCode,
  projectActivityLog
};
