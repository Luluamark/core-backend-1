const express = require("express");
const authMiddleware = require("../server/middleware/authMiddleware");
const {
  addLeave,
  getLeave,
  getLeaves,
  getLeaveDetail,
  updateLeave,
} = require("../controllers/leaveController");

const router = express.Router();

router.post("/add", authMiddleware, addLeave);

router.get("/", authMiddleware, getLeaves);

// MUST be before /:id
router.get("/LeaveDetail/:id", authMiddleware, getLeaveDetail);

// Get leaves for employee/admin
router.get("/:id/:role", authMiddleware, getLeave);

router.put("/:id", authMiddleware, updateLeave);

module.exports = router;
