const express = require("express");
const authMiddleware = require("../server/middleware/authMiddleware");
const {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
} = require("../controllers/employeeController.js");

const router = express.Router();

router.get("/", authMiddleware, getEmployees);
router.post("/add", authMiddleware, upload.single("image"), addEmployee);

// ✅ put this BEFORE /:id
router.get("/department/:id", authMiddleware, fetchEmployeesByDepId);

router.get("/:id", authMiddleware, getEmployee);
router.put("/:id", authMiddleware, updateEmployee);

module.exports = router;
