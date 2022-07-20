import "dotenv/config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";

import logger from "./logger/logger.js";
import { userRoutes, noteRoutes } from "./routes/index.js";

const app = express();

if (process.env.MONGODB_URL) {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => logger.info("🍀 Connected to MongoDB"))
    .catch((error) => console.error(error));
}

app.use(express.json());
app.use("/user", userRoutes);
app.use("/note", noteRoutes);

app.listen(process.env.PORT, () => {
  logger.info(`🚀 Server running on port ${process.env.PORT} ...`);
});
