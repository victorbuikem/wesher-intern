import express from "express";

const router = express.Router();

router.route("/").get();
router.route("/create").post();
router.route("/:category_title").get();
router.route("/:category_title/update").put();
router.route("/:category_title/delete").delete();

export default router;
