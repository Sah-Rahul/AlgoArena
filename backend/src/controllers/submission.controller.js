import { db } from "../libs/db.js";

// 1. Get all submissions by a logged-in user
export const getAllSubmission = async (req, res) => {
  try {
    const userId = req.user.id;

    const submissions = await db.submission.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { testCases: true, problem: true },
    });

    return res.status(200).json({
      success: true,
      message: "User submissions fetched successfully",
      data: submissions,
    });
  } catch (error) {
    console.error("Error in getAllSubmission:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 2. Get all submissions by a user for a specific problem
export const getSubmissionForProblem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { problemId } = req.params;

    const submissions = await db.submission.findMany({
      where: { userId, problemId },
      orderBy: { createdAt: "desc" },
      include: { testCases: true, problem: true },
    });

    return res.status(200).json({
      success: true,
      message: "User submissions for problem fetched successfully",
      data: submissions,
    });
  } catch (error) {
    console.error("Error in getSubmissionForProblem:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 3. Get total submissions for a specific problem (all users)
export const getAllTheSubmissionForProblem = async (req, res) => {
  try {
    const { problemId } = req.params;

    const totalSubmissions = await db.submission.count({
      where: { problemId },
    });

    return res.status(200).json({
      success: true,
      message: "Total submissions for problem fetched successfully",
      count: totalSubmissions,
    });
  } catch (error) {
    console.error("Error in getAllTheSubmissionForProblem:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
