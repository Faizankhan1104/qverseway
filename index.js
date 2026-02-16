import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./database/db.js";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "process.env.FRONTEND_URL",
  credentials: true
}));

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is working");
});

// routes
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";

app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  connectDb();
});

