import 'module-alias/register';
import {config} from 'dotenv';
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
import userRoutes from "./routes/user/routes";


const app = express();
const port = process.env.PORT || 5000;
connectDB(); // Connect to MongoDB
const customLogFormat = ":method :url :status :res[content-length] - :response-time ms";

app.use(cors());
app.use(express.json({ limit: '20mb'}));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(morgan(customLogFormat));
app.use(cookieParser());
app.use(helmet());
app.use('/', indexRoute);
app.use('/api/users', userRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});