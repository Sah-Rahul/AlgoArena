import express from "express";
import {
  getAllSubmission,
  getAllTheSubmissionForProblem,
  getSubmissionForProblem,
} from "../controllers/submission.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const submissionRoutes = express.Router();

// 1. Get all submissions of the logged-in user
submissionRoutes.get(
  "/user",
  authMiddleware,
  getAllSubmission
);

// 2. Get all submissions of the user for a specific problem
submissionRoutes.get(
  "/user/:problemId",
  authMiddleware,
  getSubmissionForProblem
);

// 3. Get total number of submissions for a problem (from all users)
submissionRoutes.get(
  "/count/:problemId",
  authMiddleware,
  getAllTheSubmissionForProblem
);

export default submissionRoutes;
