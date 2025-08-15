import { db } from "../libs/db.js";
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

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
      for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
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

export const getAllProblems = async (req, res) => {};

export const getAllProblemById = async (req, res) => {};

export const updateProblem = async (req, res) => {};

export const deleteProblem = async (req, res) => {};

export const getAllProblemsSolvedByUser = async (req, res) => {};
