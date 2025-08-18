import { db } from "../libs/db.js";

// ✅ Create Playlist
export const createPlayList = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    if (!name || typeof name !== "string" || name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        error: "Playlist name must be at least 3 characters long.",
      });
    }

    const playlist = await db.playlist.create({
      data: {
        name: name.trim(),
        description: description?.trim() || "",
        userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Playlist created successfully",
      playlist,
    });
  } catch (error) {
    console.error("Create Playlist Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create playlist" });
  }
};

//   Get All Playlists
export const getPlayAllListDetails = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized access" });
    }

    const playlists = await db.playlist.findMany({
      where: { userId },
      include: {
        problems: {
          include: { problem: true },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Playlists fetched successfully",
      playlists,
    });
  } catch (error) {
    console.error("Fetch Playlists Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch playlists" });
  }
};

//   Get Single Playlist
export const getPlayListDetails = async (req, res) => {
  const { playlistId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  if (!playlistId || typeof playlistId !== "string") {
    return res
      .status(400)
      .json({ success: false, error: "Invalid playlist ID" });
  }

  try {
    const playlist = await db.playlist.findFirst({
      where: {
        id: playlistId,
        userId,
      },
      include: {
        problems: {
          include: { problem: true },
        },
      },
    });

    if (!playlist) {
      return res
        .status(404)
        .json({ success: false, error: "Playlist not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Playlist fetched successfully",
      playlist,
    });
  } catch (error) {
    console.error("Get Playlist Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch playlist" });
  }
};

//   Add Problem(s) to Playlist
export const addProblemToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  if (!playlistId || typeof playlistId !== "string") {
    return res
      .status(400)
      .json({ success: false, error: "Invalid playlist ID" });
  }

  if (!Array.isArray(problemIds) || problemIds.length === 0) {
    return res
      .status(400)
      .json({ success: false, error: "problemIds must be a non-empty array" });
  }

  const formattedData = problemIds
    .filter((id) => typeof id === "string" && id.trim().length > 0)
    .map((problemId) => ({
      playListId: playlistId,
      problemId,
    }));

  if (formattedData.length === 0) {
    return res.status(400).json({
      success: false,
      error: "No valid problem IDs provided.",
    });
  }

  try {
    const validProblems = await db.problem.findMany({
      where: {
        id: { in: problemIds },
      },
      select: { id: true },
    });

    const validProblemIds = validProblems.map((p) => p.id);

    const formattedData = validProblemIds.map((problemId) => ({
      playListId: playlistId,
      problemId,
    }));

    if (formattedData.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No valid problem IDs provided.",
      });
    }

    const added = await db.problemInPlaylist.createMany({
      data: formattedData,
      skipDuplicates: true,
    });

    return res.status(201).json({
      success: true,
      message: "Problems added to playlist",
      count: added.count,
    });
  } catch (error) {
    console.error("Add Problems Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to add problems to playlist" });
  }
};

//   Remove Problem(s) from Playlist
export const removeProblemFromPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  // ✅ Validate playlistId
  if (!playlistId || typeof playlistId !== "string") {
    return res
      .status(400)
      .json({ success: false, error: "Invalid playlist ID" });
  }

  // ✅ Validate problemIds array
  if (!Array.isArray(problemIds) || problemIds.length === 0) {
    return res
      .status(400)
      .json({ success: false, error: "problemIds must be a non-empty array" });
  }

  // ✅ Filter only valid strings
  const validProblemIds = problemIds.filter(
    (id) => typeof id === "string" && id.trim().length > 0
  );

  if (validProblemIds.length === 0) {
    return res
      .status(400)
      .json({ success: false, error: "No valid problem IDs provided" });
  }

  try {
    // ✅ Delete matching problem entries
    const deleted = await db.problemInPlaylist.deleteMany({
      where: {
        playListId: playlistId, // ✅ Correct field name from your Prisma schema
        problemId: {
          in: validProblemIds,
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Problems removed from playlist",
      deletedCount: deleted.count,
    });
  } catch (error) {
    console.error("Remove Problems Error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to remove problems from playlist",
    });
  }
};

//   Delete Playlist
export const deletePlayList = async (req, res) => {
  const { playlistId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  if (!playlistId || typeof playlistId !== "string") {
    return res
      .status(400)
      .json({ success: false, error: "Invalid playlist ID" });
  }

  try {
    const deleted = await db.playlist.delete({
      where: {
        id: playlistId,
        userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
      deleted,
    });
  } catch (error) {
    console.error("Delete Playlist Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete playlist" });
  }
};
