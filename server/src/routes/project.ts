import {protect} from "../middlewares/auth";
import {Router} from "express";
import {getProject, getProjects,getTeam, createProject, deleteProject, updateProject, onboardUser, removeUserFromProject, makeProjectActiveOrInactive, generateAccessCode, projectActivityLog} from "../controllers/project";

const router = Router();

router.route('/').get(protect, getProjects);
router.route("/").post(protect, createProject);
router.route("/onboard").post(protect, onboardUser);
router.route("/:id").get(protect, getProject);
router.route("/:id").put(protect, updateProject).delete(protect, deleteProject);
router.route("/:id/team").get(protect, getTeam);
router.route("/:id/active").patch(protect, makeProjectActiveOrInactive);
router.route("/:id/access-code").patch(protect, generateAccessCode);
router.route("/:id/activity-log").get(protect, projectActivityLog);
router.route("/:id/team/:userId").delete(protect, removeUserFromProject);

export default router;