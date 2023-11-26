import { protect } from "../middlewares/auth";
import { Router } from "express";

import {
  uploadAttachment,
  getProjectAttachments,
  getUserAttachments,
  getAttachmentById,
  deleteAttachment,
  updateAttachment
} from "../controllers/attachment";

const router = Router();

router.route("/").post(protect, uploadAttachment);
router.route("/:projectId").get(protect, getProjectAttachments);
router.route("/user/:userId").get(protect, getUserAttachments);
router.route("/:id").get(protect, getAttachmentById).delete(protect, deleteAttachment).put(protect, updateAttachment);