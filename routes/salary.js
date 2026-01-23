const express = require("express");
const authMiddleware = require("../server/middleware/authMiddleware");
const {
  addSalary,
  getSalary,
  getEmployeeSalary,
} = require("../controllers/SalaryController");

const router = express.Router();

router.post("/add", authMiddleware, addSalary);
router.get("/:id", authMiddleware, getSalary);
router.get("/employee/:id", authMiddleware, getEmployeeSalary);

module.exports = router;
