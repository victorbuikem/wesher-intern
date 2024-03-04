import { eq } from "drizzle-orm";
import express from "express";
import { ZodError } from "zod";
import { bookSchema, bookSchemaUpdate } from "../api_schema";
import { db } from "../database";
import { book } from "../database/schema";

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const result = await db.query.book.findMany();
    res.status(200).json({
      success: true,
      data: result,
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

    const result = await db
      .insert(book)
      .values({
        title: title.toLowerCase(),
        author: author.toLowerCase(),
        category: category.toLowerCase(),
        publicationYear,
        isbn: ISBN,
      })
      .returning();

    res.status(201).json({ success: true, data: result[0] });
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
    // Hint: Book Title should be passed in lowercase with underscore to represent spaces
    const { book_title } = req.params;
    let formattedTitle = book_title.replace("_", " ");

    const result = await db.query.book.findFirst({
      where: eq(book.title, formattedTitle),
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, error_msg: error });
  }
});

// router.route("/:book_id").get(async (req, res) => {
//   try {
//     const { book_id } = req.params;

//     const result = await db.query.book.findFirst({
//       where: eq(book.id, book_id),
//     });

//     res.status(200).json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {}
// });

router.route("/:book_title/update").put(async (req, res) => {
  try {
    const { book_title } = req.params;
    const { title, ISBN, author, category, publicationYear } =
      bookSchemaUpdate.parse(req.body);
    let formattedTitle = book_title.replace("_", " ");

    const result = await db
      .update(book)
      .set({
        title: title?.toLowerCase(),
        isbn: ISBN,
        author: author?.toLowerCase(),
        category: category?.toLowerCase(),
        publicationYear,
        updated_at: new Date(),
      })
      .where(eq(book.title, formattedTitle))
      .returning();

    res.status(200).json({ success: true, data: result[0] });
  } catch (error) {
    res.status(500).json({ success: false, error_msg: error });
  }
});

router.route("/:book_title/delete").delete(async (req, res) => {
  try {
    const { book_title } = req.params;
    let formattedTitle = book_title.replace("_", " ");

    const result = await db
      .delete(book)
      .where(eq(book.title, formattedTitle))
      .returning();

    res.status(204).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error_msg: error });
  }
});

export default router;
