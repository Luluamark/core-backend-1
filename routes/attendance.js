const express = require("express");
const router = express.Router();
const authMiddleware = require("../server/middleware/authMiddleware");
const defaultAttendance = require("../server/middleware/defaultAttendance");

const {
  getAttendance,
  updateAttendance,
  attendanceReport,
} = require("../controllers/attendanceController");

router.get("/", authMiddleware, defaultAttendance, getAttendance);
router.put("/update/:employeeId", authMiddleware, updateAttendance);
router.get("/report", authMiddleware, attendanceReport);

module.exports = router;
