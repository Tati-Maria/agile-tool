import { protect } from "../middlewares/auth";
import { Router } from "express";
import {getSprintById, getSprintsByProject, updateSprint, createSprint, deleteSprint, addTaskToSprint, removeTaskFromSprint } from "../controllers/sprint";

const router = Router();

router.route("/").post(protect, createSprint);
router.route("/:id").get(protect, getSprintById).put(protect, updateSprint).delete(protect, deleteSprint);
router.route("/project/:id").get(protect, getSprintsByProject);
router.route("/:id/add-task").patch(protect, addTaskToSprint);
router.route("/:id/remove-task").patch(protect, removeTaskFromSprint);

export default router;