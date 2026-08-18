const express = require("express");
const router = express.Router();
const History = require("../models/History");

// @route   GET /api/history
// @desc    Get recent symptom analysis history
router.get("/", async (req, res) => {
  try {
    const history = await History.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error("Error fetching history:", err.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// @route   DELETE /api/history/:id
// @desc    Delete a history record
router.delete("/:id", async (req, res) => {
  try {
    const historyItem = await History.findById(req.params.id);
    if (!historyItem) {
      return res.status(404).json({ error: "History record not found" });
    }
    await History.findByIdAndDelete(req.params.id);
    res.json({ message: "History record deleted successfully" });
  } catch (err) {
    console.error("Error deleting history:", err.message);
    res.status(500).json({ error: "Failed to delete history record" });
  }
});

module.exports = router;
