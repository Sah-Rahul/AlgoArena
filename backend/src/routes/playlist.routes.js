import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  createPlayList,
  getPlayAllListDetails,
  getPlayListDetails,
  addProblemToPlaylist,
  removeProblemFromPlaylist,
  deletePlayList,
} from "../controllers/playlist.controller.js";

const router = express.Router();

//  Get all playlists of authenticated user
router.get("/", authMiddleware, getPlayAllListDetails);

//  Get a single playlist by ID
router.get("/:playlistId", authMiddleware, getPlayListDetails);

//  Create a new playlist
router.post("/create-playlist", authMiddleware, createPlayList);

//  Add problems to a playlist
router.post("/:playlistId/add-problem", authMiddleware, addProblemToPlaylist);

//  Remove problems from a playlist
router.delete(
  "/:playlistId/remove-problem",
  authMiddleware,
  removeProblemFromPlaylist
);

//  Delete a playlist
router.delete("/:playlistId", authMiddleware, deletePlayList);

export default router;
