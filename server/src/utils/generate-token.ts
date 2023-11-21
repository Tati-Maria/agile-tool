import jwt from 'jsonwebtoken';
import { Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (res: Response, userId: string) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET!, {expiresIn: '7d'});
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
}

export default generateToken;