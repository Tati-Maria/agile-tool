import {protect} from "../middlewares/auth";
import {Router} from "express";
import {getTasks, getTaskById, deleteTask,searchTasks, updateTask, createTask, updateTaskStatus} from "../controllers/task";

const router = Router();

router.route("/").post(protect, createTask).get(protect, getTasks);
router.route("/:id").get(protect, getTaskById).put(protect, updateTask).delete(protect, deleteTask);
router.route("/:id/status").patch(protect, updateTaskStatus);
router.route("/search").get(protect, searchTasks);

export default router;