import 'module-alias/register';
import { config } from 'dotenv';
config();
import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
// Routes
import indexRoute from './routes/index-route';
import connectDB from './config/db';
import { notFound, errorHandler } from './middlewares/error';
import userRoutes from './routes/user';
import projectRoutes from './routes/project';
import sprintRoutes from './routes/sprint';
import taskRoutes from './routes/task';
import commentRoutes from './routes/comment';
import attachmentRoutes from './routes/attachment';

const app = express();
const port = process.env.PORT || 5000;
connectDB(); // Connect to MongoDB
const customLogFormat =
  ':method :url :status :res[content-length] - :response-time ms';
// Middlewares
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(morgan(customLogFormat));
app.use(cookieParser());
app.use(helmet());
app.use('/', indexRoute);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/sprints', sprintRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/attachments', attachmentRoutes);
// Error handling
app.use(notFound);
app.use(errorHandler);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
