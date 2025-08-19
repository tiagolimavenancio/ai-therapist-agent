import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";
import { Activity } from "../models/Activity";

// Log a new activity
export const logActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, name, description, duration, difficulty, feedback } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const activity = new Activity({
      userId,
      type,
      name,
      description,
      duration,
      difficulty,
      feedback,
      timestamp: new Date(),
    });

    await activity.save();
    logger.info(`Activity logged for user ${userId}`);

    res.status(201).json({ success: true, data: activity });
  } catch (error) {
    next(error);
  }
};
