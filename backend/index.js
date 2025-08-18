import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


// import routes
import authRoutes from "./src/routes/auth.routes.js";
import problemRoutes from "./src/routes/problem.routes.js";
import excuteRoutes from "./src/routes/excute.routes.js";
import submissionRoutes from "./src/routes/submission.routes.js";
import playlistRoutes from "./src/routes/playlist.routes.js";

// use routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/excute-code", excuteRoutes);
app.use("/api/v1/submission", submissionRoutes);
app.use("/api/v1/playlist", playlistRoutes);

app.get("/", (req, res) => {
  res.send("Server is running ✔✔");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
