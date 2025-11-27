import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { connectDB } from "./lib/db.js";

import authRouter from "./routes/authRoutes.js";

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:8081",
  })
);
app.use(express.json());

app.use("/api/auth", authRouter);

connectDB().then(() => {
  console.log("Connected to DB");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
