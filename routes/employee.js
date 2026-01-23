const express = require("express");
const authMiddleware = require("../server/middleware/authMiddleware");
const {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
  deleteEmployee,
} = require("../controllers/employeeController.js");

const router = express.Router();

router.get("/", authMiddleware, getEmployees);
router.post("/add", authMiddleware, upload.single("image"), addEmployee);
router.get("/:id", authMiddleware, getEmployee);
router.put("/:id", authMiddleware, updateEmployee);
router.get("/department/:id", authMiddleware, fetchEmployeesByDepId);
router.delete("/employees/:id", deleteEmployee);

// router.delete("/department/:id", authMiddleware, fetchEmployeesByDepId);

module.exports = router;
