import express from "express";
import { categorySchema, categorySchemaUpdate } from "../api_schema";
import { ZodError } from "zod";
import { db } from "../database";
import { book, category } from "../database/schema";
import { eq } from "drizzle-orm";

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const result = await db.query.category.findMany({});

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
    const { name } = categorySchema.parse(req.body);

    const result = await db
      .insert(category)
      .values({
        name,
      })
      .returning();

    res.status(200).json({ success: true, data: result[0] });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422).json({ success: false, error_message: error.message });
    }
    res.status(500).json({ success: false, error_msg: error });
  }
});

router.route("/:category_id").get(async (req, res) => {
  try {
    const { category_id } = req.params;

    const result = await db.query.category.findFirst({
      where: eq(category.id, category_id),
    });

    if (!result) {
      res.status(404).json({
        success: false,
        error_msg: "Can't Find that category...Please confirm again",
      });
      return;
    }

    const categoryBooks = await db.query.book.findMany({
      where: eq(book.category, result.name),
    });

    const data = { ...result, books: categoryBooks };

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log("Server Error", error);
    res.status(500).json({ success: true, error_msg: error });
  }
});

router.route("/:category_id/update").put(async (req, res) => {
  try {
    const { category_id } = req.params;
    const { name } = categorySchemaUpdate.parse(req.body);

    const result = await db
      .update(category)
      .set({
        name,
      })
      .returning();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log("Server Error", error);
    res.status(500).json({ success: true, error_msg: error });
  }
});

router.route("/:category_id/delete").delete(async (req, res) => {
  try {
    const { category_id } = req.params;

    const result = await db
      .delete(category)
      .where(eq(category.id, category_id))
      .returning();

    res.status(204).json({ success: true, data: result });
  } catch (error) {
    console.log("Server Error", error);
    res.status(500).json({ success: true, error_msg: error });
  }
});

export default router;
