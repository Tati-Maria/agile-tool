import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err: { message: string; stack: string; name: string }, req: Request, res: Response) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    console.log(err.stack);

    if(err.name === 'CastError' && err.message.includes("Cast to ObjectId failed")) {
        statusCode = 404;
        message = "Resource not found";
    }

    res.status(statusCode).json({
      error: {
        message,
        name: err.name,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
      }
    });

};

export { notFound, errorHandler };