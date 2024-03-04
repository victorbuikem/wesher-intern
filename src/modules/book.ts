import { eq } from "drizzle-orm";
import express from "express";
import { ZodError } from "zod";
import { bookSchema } from "../api_schema";
import { db } from "../database";
import { book } from "../database/schema";

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const result = await db.query.book.findMany();
    console.log(result);
    res.status(200).json({
      success: true,
      data: "result",
    });
  } catch (error) {
    console.log("Server Error", error);
    res.status(500).json({ success: true, error_msg: error });
  }
});
router.route("/create").post(async (req, res) => {
  try {
    const { title, ISBN, author, category, publicationYear } = bookSchema.parse(
      req.body
    );
    console.log(title, author, category, publicationYear, ISBN);
    const test = await db.query.book.findMany();
    console.log(test);

    // const result = await db
    //   .insert(book)
    //   .values({
    //     title,
    //     author,
    //     category,
    //     publicationYear,
    //     isbn: ISBN,
    //   })
    //   .returning();

    res.status(200).json({ success: true, data: "result[0]" });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422).json({ success: false, error_message: error.message });
      return;
    }
    res.status(500).json({ success: false, error_msg: error });
  }
});
router.route("/:book_title").get(async (req, res) => {
  try {
    const { book_title } = req.params;
    const getBook = async () => {
      const result = await db.query.book.findFirst({
        where: eq(book.title, book_title),
      });
      return result;
    };

    res.status(200).json({
      success: true,
      data: await getBook(),
    });
  } catch (error) {}
});
router.route("/:book_title/update").put(async (req, res) => {
  try {
    const { book_title } = req.params;

    const getBook = async () => {
      const result = await db.query.book.findFirst();
      return result;
    };
  } catch (error) {}
});
router.route("/:book_title/delete").delete(async (req, res) => {
  try {
    const { book_title } = req.params;
  } catch (error) {}
});

export default router;
