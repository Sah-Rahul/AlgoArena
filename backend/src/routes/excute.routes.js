import express from "express";
import { authMiddleware, checkAdmin } from "../middleware/auth.middleware.js";
import { excuteCode } from "../controllers/excute.controller.js";

const excuteRoutes = express.Router();

excuteRoutes.post( "/", authMiddleware, excuteCode);



export default excuteRoutes;
