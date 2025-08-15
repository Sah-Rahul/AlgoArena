import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

export const createProblem = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      hints,
      testcases,
      codeSnippets,
      referenceSolutions,
      editorial,
    } = req.body;

    console.log("constraints-----", constraints);
    // Role check
    if (req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "You are not allowed to create a problem!" });
    }

    try {
      for (const [language, solutionCode] of Object.entries(
        referenceSolutions
      )) {
        const languageId = getJudge0LanguageId(language);
        if (!languageId) {
          return res.status(400).json({
            error: `Language ${language} is not supported`,
          });
        }

        const submissions = testcases.map(({ input, output }) => ({
          source_code: solutionCode,
          language_id: languageId,
          stdin: input,
          expected_output: output,
        }));

        const submissionResults = await submitBatch(submissions);
        const tokens = submissionResults.map((r) => r.token);
        const results = await pollBatchResults(tokens);

        console.log("results--------", results);

        for (let i = 0; i < results.length; i++) {
          if (results[i].status.id !== 3) {
            return res.status(400).json({
              error: `TestCase ${i + 1} failed for language ${language}`,
            });
          }
        }
      }

      const newProblem = await db.problem.create({
        data: {
          id,
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testcases,
          codeSnippets,
          hints,
          editorial,
          referenceSolutions,
          userId: req.user.id,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Problem created successfully",
        data: newProblem,
        success: true,
      });
    } catch (error) {
      console.error(error);

      res
        .status(500)
        .json({ success: false, error: "Error while validating problem" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Server error" });
  }
};

export const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany({});

    if (!problems) {
      return res.status(404).json({ message: "problems not found !" });
    }

    return res.status(200).json({
      success: true,
      message: "All problems fetch successfully",
      problems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProblemById = async (req, res) => {
  try {
    const { id } = req.params;
    const ProblemById = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!ProblemById) {
      return res.status(404).json({ message: "ProblemById not found !" });
    }

    return res.status(200).json({
      success: true,
      message: "ProblemById fetch successfully",
      ProblemById,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      hints,
      testcases,
      codeSnippets,
      referenceSolutions,
      editorial,
    } = req.body;

    try {
      if (!codeSnippets || typeof codeSnippets !== "object") {
        return res
          .status(400)
          .json({ error: "Invalid or missing codeSnippets" });
      }
      for (const [language, solutionCode] of Object.entries(codeSnippets)) {
        const languageId = getJudge0LanguageId(language);
        if (!languageId) {
          return res.status(400).json({
            error: `Language ${language} is not supported`,
          });
        }

        const submissions = testcases.map(({ input, output }) => ({
          source_code: solutionCode,
          language_id: languageId,
          stdin: input,
          expected_output: output,
        }));

        const submissionResults = await submitBatch(submissions);
        const tokens = submissionResults.map((r) => r.token);
        const results = await pollBatchResults(tokens);

        console.log("results--------", results);
        for (let i = 0; i < results.length; i++) {
          if (results[i].status.id !== 3) {
            return res.status(400).json({
              error: `TestCase ${i + 1} failed for language ${language}`,
            });
          }
        }
      }

      const updatedProblem = await db.problem.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          hints,
          testcases,
          codeSnippets,
          referenceSolutions,
          editorial,
        },
      });

      res.status(200).json({
        success: true,
        message: "problemUpdated successfulliy",
        updatedProblem,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({ message: "id is required !" });
    }

    const deleteProblem = await db.problem.findUnique({
      where: {
        id,
      },
    });
    if (!deleteProblem) {
      return res
        .status(404)
        .json({ success: false, message: "noProblem found !" });
    }
    const deletedProblem = await db.problem.delete({
      where: {
        id,
      },
    });
    return res
      .status(200)
      .json({ success: true, message: "Problem is deleted !", deletedProblem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllProblemsSolvedByUser = async (req, res) => {
  try {
    const problems = await db.problem.findMany({
      where: {
        solvedBy: {
          some: {
            userId: req.user.id,
          },
        },
      },
      include: {
        solvedBy: {
          where: {
            userId: req.user.id,
          },
        },
      },
      orderBy: { createdAt: "desc" }, // optional: latest first
    });

    if (!problems || problems.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No problems solved by this user",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Problems solved by user fetched successfully",
      data: problems,
    });
  } catch (error) {
    console.error("Error in getAllProblemsSolvedByUser:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
