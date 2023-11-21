import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../../models/user';
import { IUserRequest } from 'types/user-interface';

// @desc Get user profile
// @route GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req: IUserRequest, res: Response) => {
    const user = await User.findById(req.user?._id).exec();
    if(!user) {
        res.status(404);
        throw new Error('User not found');
    } else {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
        });
    }
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin

const getUsers = asyncHandler(async (req: IUserRequest, res) => {
    const users = await User.find({}).exec();
    res.json(users);
});

// @desc Delete user
// @route DELETE /api/users/profile
// @access Private/Admin
const deleteUserAccount = asyncHandler(async (req: IUserRequest, res: Response) => {
    const user = await User.findByIdAndDelete(req.user?._id).exec();
    if(!user) {
        res.status(404);
        throw new Error('User not found');
    } else {
        res.status(200).json({
            message: 'User deleted successfully',
        });
    }
});

export { getUserProfile, getUsers, deleteUserAccount };