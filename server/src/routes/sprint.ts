import { protect } from "../middlewares/auth";
import { Router } from "express";
import {getSprintById, getSprintsByProject, updateSprint, createSprint, deleteSprint } from "../controllers/sprint";

const router = Router();

router.route("/").post(protect, createSprint);
router.route("/:id").get(protect, getSprintById).put(protect, updateSprint).delete(protect, deleteSprint);
router.route("/project/:id").get(protect, getSprintsByProject);

export default router;