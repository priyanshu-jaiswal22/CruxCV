import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadResume, getAllResumes ,downloadResumePDF} from "../controllers/resumeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);
router.get("/all", authMiddleware ,getAllResumes);
router.get("/download/:id", downloadResumePDF);

export default router;
