import express from "express";
import { logActivity } from "../controllers/activityController";
import { auth } from "../middlewares/auth";

const router = express.Router();

// All routes are protected with authentication
router.use(auth);

// Log a new activity
router.post("/", logActivity);

export default router;
