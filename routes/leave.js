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

// user leaves (no param needed)
router.get("/my", authMiddleware, getLeave);

router.put("/:id", authMiddleware, updateLeave);

// router.post("/add", authMiddleware, addLeave);
// router.get("/:id", authMiddleware, getLeave);
// router.get("/LeaveDetail/:id", authMiddleware, getLeaveDetail);
// router.get("/", authMiddleware, getLeaves);
// router.put("/:id", authMiddleware, updateLeave);

module.exports = router;
