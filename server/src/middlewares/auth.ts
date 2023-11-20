import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import User from 'models/user';
import { IUserRequest } from 'types/user-interface';
import asyncHandler from 'express-async-handler';
import {config} from 'dotenv';
config();

interface TokenPayload extends JwtPayload {
  userId: string;
}

const protect = asyncHandler(async (req: IUserRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
            const user = await User.findById(decoded.userId).exec();
            if(user) {
                req.user = user;
                next();
            } else {
                res.status(404);
                throw new Error('User not found');
            }
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const adminRoute = (req: IUserRequest, res: Response, next: NextFunction) => {
    if(req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

export { protect, adminRoute };