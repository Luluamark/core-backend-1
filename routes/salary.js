const express = require("express");
const authMiddleware = require("../server/middleware/authMiddleware");
const {
  addSalary,
  getSalary,
  getEmployeeSalary,
} = require("../controllers/SalaryController");

const router = express.Router();

router.post("/add", authMiddleware, addSalary);

// Admin – salary by employeeId
router.get("/admin/:id", authMiddleware, getSalary);

// Employee – own salary by userId
router.get("/employee/:id", authMiddleware, getEmployeeSalary);

// // employee salary FIRST
// router.get("/employee/:id", authMiddleware, getEmployeeSalary);

// // generic LAST
// router.get("/:id/:role", authMiddleware, getSalary);

module.exports = router;
