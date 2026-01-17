import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

const app = express();

app.use(express.json());
app.use(cors(
  {
    origin: [
      "http://localhost:5173",
      "https://cruxcv.onrender.com/"
    ],
    credentials: true,
  }
));

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.get("/", (req, res) => {
  res.send("CruxCV Backend is running 🚀");
});

export default app;
