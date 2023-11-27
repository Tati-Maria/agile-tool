import { protect } from "../middlewares/auth";
import { Router } from "express";
import multer from "multer";

import {
  uploadAttachment,
  getProjectAttachments,
  getUserAttachments,
  getAttachmentById,
  deleteAttachment,
  updateAttachment
} from "../controllers/attachment";



const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("/").post(protect, upload.single("file"), uploadAttachment);
router.route("/:projectId").get(protect, getProjectAttachments);
router.route("/user/:userId").get(protect, getUserAttachments);
router.route("/:id").get(protect, getAttachmentById).delete(protect, deleteAttachment).put(protect, updateAttachment);

export default router;