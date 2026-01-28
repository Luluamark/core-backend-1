const express = require("express");
const authMiddleware = require("../server/middleware/authMiddleware");
const {
  addLeave,
  getLeave,

  getLeaves,
} = require("../controllers/leaveController");

const router = express.Router();

router.post("/add", authMiddleware, addLeave);
router.get("/:id", authMiddleware, getLeave);

router.get("/", authMiddleware, getLeaves);

module.exports = router;
