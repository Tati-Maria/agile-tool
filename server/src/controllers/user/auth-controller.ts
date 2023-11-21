/* eslint-disable @typescript-eslint/no-explicit-any */
import asyncHandler from 'express-async-handler';
import User from '../../models/user';
import { IUserRequest } from '../../types/user-interface';
import generateToken from '../../utils/generate-token';
import { uploadAvatar, deleteAvatar } from '../../utils/cloudinary';
import { Response } from 'express';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req: IUserRequest, res: Response) => {
    const {name, email, password, role, avatar} = req.body;

    const user = await User.findOne({email});
    if(user) {
        res.status(400);
        throw new Error('User already exists');
    }

    const avatarResult: any = await uploadAvatar(avatar);
    const newUser = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        role,
        avatar: avatarResult.secure_url,
        avatarPublicId: avatarResult.public_id,
    });

    if(newUser) {
        generateToken(res, newUser._id);
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            avatar: newUser.avatar,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req: IUserRequest, res: Response) => {
    const {email, password} = req.body;

    const user = await User.findOne({email}).exec();
    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Logout user
// @route   GET /api/users/logout
// @access  Private

const logoutUser = asyncHandler(async (req: IUserRequest, res: Response) => {
    res.cookie("token", "" , {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({
        message: "Logged out successfully",
    });
});

// @desc User forgot password
// @route POST /api/users/forgot-password
// @access Public

const forgotPassword = asyncHandler(async (req: IUserRequest, res: Response) => {
    const {email, password} = req.body;

    if(!email) {
        res.status(400);
        throw new Error('Please enter your email');
    }

    const findUser = await User.findOne({email}).exec();

    if(!findUser) {
        res.status(404);
        throw new Error('User not found');
    }

    findUser.password = password;
    await findUser.save();

});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req: IUserRequest, res: Response) => {
    const user = await User.findById(req.user?._id).exec();
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password) {
            user.password = req.body.password;
        }
        if(req.body.avatar) {
            if(user.avatarPublicId) {
                await deleteAvatar(user.avatarPublicId);
            }
            const avatarResult: any = await uploadAvatar(req.body.avatar);
            user.avatar = avatarResult.secure_url;
            user.avatarPublicId = avatarResult.public_id;
        }
        const updatedUser = await user.save();
        generateToken(res, updatedUser._id);
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            avatar: updatedUser.avatar,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

export { registerUser, loginUser, logoutUser, forgotPassword, updateUserProfile}