const express = require("express");
const authMiddleware = require("../server/middleware/authMiddleware");
const {
  addLeave,
  getLeaves,
  getAllLeaves,
} = require("../controllers/leaveController");

const router = express.Router();

router.post("/add", authMiddleware, addLeave);
router.get("/:id", authMiddleware, getLeaves);
router.get("/", authMiddleware, getAllLeaves);

module.exports = router;
