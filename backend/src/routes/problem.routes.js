import express from "express";

import { authMiddleware, checkAdmin } from "../middleware/auth.middleware.js";
import { createProblem, deleteProblem, getAllProblemById, getAllProblems, getAllProblemsSolvedByUser, updateProblem } from "../controllers/problem.controller.js";

const problemRoutes = express.Router();

problemRoutes.post( "/create-problem", authMiddleware, checkAdmin, createProblem);

problemRoutes.get("/get-all-problems", authMiddleware, getAllProblems);

problemRoutes.get("/get-all-problem/:id", authMiddleware, getAllProblemById);

problemRoutes.put("/update-problem/:id", authMiddleware, checkAdmin, updateProblem);

problemRoutes.delete( "/delete-problem/:id", authMiddleware, checkAdmin, deleteProblem);

problemRoutes.post( "/get-solved-problems", authMiddleware, getAllProblemsSolvedByUser);

export default problemRoutes;
