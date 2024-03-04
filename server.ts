import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { logger } from "./src/middlewares/logger";
import authorRoute from "./src/modules/author";
import bookRoute from "./src/modules/book";
import categoryRoute from "./src/modules/category";

dotenv.config();
const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(logger);

//Routes
app.use("/api/v1/book", bookRoute);
app.use("/api/v1/author", authorRoute);
app.use("/api/v1/category", categoryRoute);

app.use("*", (req, res) => {
  res.status(404).json({ message: "This Route Not Found" });
});

export default app;
