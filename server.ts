import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logger } from "./src/middlewares/logger";

dotenv.config();
const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.use("/api/v1/books", (req, res, next) => {
  console.log("Auth Middleware");
  res.status(200).json({ message: "Books" });
});
app.use("/api/v1/author", (req, res, next) => {
  console.log("Auth Middleware");
});
app.use("/api/v1/catergories", (req, res, next) => {
  console.log("Auth Middleware");
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "This Route Not Found" });
});

export default app;
