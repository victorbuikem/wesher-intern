import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logger } from "./src/middlewares/logger";
import bookRoute from "./src/modules/book";
import authorRoute from "./src/modules/author";
import categoryRoute from "./src/modules/category";

dotenv.config();
const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(logger);

//Routes
app.use("/api/v1/books", bookRoute);
app.use("/api/v1/author", authorRoute);
app.use("/api/v1/catergory", categoryRoute);

app.use("*", (req, res) => {
  res.status(404).json({ message: "This Route Not Found" });
});

export default app;
