import express from "express";

const router = express.Router();

router.route("/").get();
router.route("/create").post();
router.route("/:author_id").get();
router.route("/:author_id/update").put();
router.route("/:author_id/delete").delete();

export default router;
