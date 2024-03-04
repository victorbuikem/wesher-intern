import express from "express";
import { categorySchema } from "../api_schema";
import { ZodError } from "zod";

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const getAllBooks = async () => {
      return [
        {
          title: "50 Shades of Grey",
          author: "Red",
          category: "Romance",
          publication_year: 1959,
          isbn: "sjkcnjfnscj",
        },
        {
          title: "50 Shades of Grey",
          author: "Red",
          category: "Romance",
          publication_year: 1959,
          isbn: "sjkcnjfnscj",
        },
        {
          title: "50 Shades of Grey",
          author: "Red",
          category: "Romance",
          publication_year: 1959,
          isbn: "sjkcnjfnscj",
        },
      ];
    };

    res.status(200).json({
      success: true,
      data: await getAllBooks(),
    });
  } catch (error) {
    console.log("Server Error", error);
    res.status(500).json({ success: true, error_msg: error });
  }
});
router.route("/create").post(async (req, res) => {
  try {
    const { name } = categorySchema.parse(req.body);

    const createBook = async () => {
      return {
        name,
      };
    };

    res.status(200).json({ success: true, data: await createBook() });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422).json({ success: false, error_message: error.message });
    }
    res.status(500).json({ success: false, error_msg: error });
  }
});
router.route("/:category_title").get(async (req, res) => {
  try {
    const { category_title } = req.params;
  } catch (error) {}
});
router.route("/:category_title/update").put(async (req, res) => {
  try {
    const { category_title } = req.params;
  } catch (error) {}
});
router.route("/:category_title/delete").delete(async (req, res) => {
  try {
    const { category_title } = req.params;
  } catch (error) {}
});

export default router;
