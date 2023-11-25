import { Router } from "express";
import { protect } from "../middlewares/auth";
import {createComment, updateComment, deleteComment} from "../controllers/comment";

const router = Router();

router.route('/').post(protect, createComment);
router.route('/:id').put(protect, updateComment).delete(protect, deleteComment);

export default router;