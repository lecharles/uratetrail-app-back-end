const router = require("express").Router();
const Comment = require("../models/comment");

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("user", "username")
      .populate("trail", "name")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

router.get("/trail/:trailId", async (req, res) => {
  try {
    const comments = await Comment.find({ trail: req.params.trailId })
      .populate("user", "username")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      user: req.user._id,
    });
    const populatedComment = await Comment.findById(comment._id)
      .populate("user", "username")
      .populate("trail", "name");
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ err: "Comment not found" });
    }
    if (comment.user.toString() !== req.user._id) {
      return res.status(403).json({ err: "You can only edit your own comments" });
    }
    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("user", "username").populate("trail", "name");
    res.json(updated);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ err: "Comment not found" });
    }
    if (comment.user.toString() !== req.user._id) {
      return res.status(403).json({ err: "You can only delete your own comments" });
    }
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

module.exports = router;