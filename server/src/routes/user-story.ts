import {protect} from "../middlewares/auth";
import {Router} from "express";
import {getUserStoriesByProjectId, getUserStoryById, deleteUserStory, updateUserStory, createUserStory, addTaskToUserStory, removeTaskFromUserStory} from "../controllers/user-story";

const router = Router();

router.route("/").post(protect, createUserStory);
router.route("/:id").get(protect, getUserStoryById).put(protect, updateUserStory).delete(protect, deleteUserStory);
router.route("/project/:id").get(protect, getUserStoriesByProjectId);
router.route("/:id/add-task").patch(protect, addTaskToUserStory);
router.route("/:id/remove-task").patch(protect, removeTaskFromUserStory);

export default router;