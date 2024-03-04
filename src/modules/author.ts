import express from "express";
import { authorSchema, authorSchemaUpdate } from "../api_schema";
import { ZodError } from "zod";
import { db } from "../database";
import { author } from "../database/schema";
import { eq } from "drizzle-orm";

const router = express.Router();

router.route("/create").post(async (req, res) => {
  try {
    const { name, email } = authorSchema.parse(req.body);

    const result = await db
      .insert(author)
      .values({
        email,
        name: name.toLowerCase(),
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

router.route("/").get(async (req, res) => {
  try {
    const result = await db.query.author.findMany();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log("Server Error", error);
    res.status(500).json({ success: true, error_msg: error });
  }
});

router.route("/:author_id").get(async (req, res) => {
  try {
    const { author_id } = req.params;

    const result = await db.query.author.findFirst({
      where: eq(author.id, author_id),
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {}
});

router.route("/:author_id/update").put(async (req, res) => {
  try {
    const { author_id } = req.params;
    const { name, email } = authorSchemaUpdate.parse(req.body);

    const result = await db
      .update(author)
      .set({
        name,
        email,
        updated_at: new Date(),
      })
      .where(eq(author.id, author_id))
      .returning();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {}
});

router.route("/:author_id/delete").delete(async (req, res) => {
  try {
    const { author_id } = req.params;
  } catch (error) {}
});

export default router;
