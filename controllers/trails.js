const router = require("express").Router();
const Trail = require("../models/trail");

router.get("/", async (req, res) => {
  try {
    const trails = await Trail.find({}).sort({ createdAt: -1 });
    res.json(trails);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const trail = await Trail.findById(req.params.id);
    if (!trail) {
      return res.status(404).json({ err: "Trail not found" });
    }
    res.json(trail);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const trail = await Trail.create(req.body);
    res.status(201).json(trail);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const trail = await Trail.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!trail) {
      return res.status(404).json({ err: "Trail not found" });
    }
    res.json(trail);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const trail = await Trail.findByIdAndDelete(req.params.id);
    if (!trail) {
      return res.status(404).json({ err: "Trail not found" });
    }
    res.json({ message: "Trail deleted" });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

module.exports = router;