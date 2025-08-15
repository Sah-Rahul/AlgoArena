import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());

// import routes
import authRoutes from "./src/routes/auth.routes.js";
import problemRoutes from "./src/routes/problem.routes.js";
import excuteRoutes from "./src/routes/excute.routes.js";
import submissionRoutes from "./src/routes/submission.routes.js";

// use routes
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/problems', problemRoutes)
app.use('/api/v1/excute-code', excuteRoutes)
app.use('/api/v1/submission', submissionRoutes)

app.get("/", (req, res) => {
  res.send("Server is running ✔✔");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
