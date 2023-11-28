import { Router } from "express";
import { protect } from "../middlewares/auth";
import {createComment, updateComment, deleteComment, getTaskComments} from "../controllers/comment";

const router = Router();

router.route('/').post(protect, createComment);
router.route('/:id').put(protect, updateComment).delete(protect, deleteComment);
router.route('/task/:id').get(protect, getTaskComments);

export default router;