import express from "express";

const router = express.Router();

router.route("/").get();
router.route("/create").post((req, res) => {
  res.status(200).json({ msg: "jhbefduihs" });
});
router.route("/:book_id").get();
router.route("/:book_id/update").put();
router.route("/:book_id/delete").delete();

export default router;
