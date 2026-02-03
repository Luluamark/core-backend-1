const multer = require("multer");
const bcrypt = require("bcrypt");
const Employee = require("../models/Employee");
const User = require("../models/User");
const Department = require("../models/DepartmentModel");

/* ===============================
MULTER CONFIG (NETLIFY SAFE)
================================ */

const upload = multer({
  dest: "/tmp/uploads",
});

/* ===============================
   ADD EMPLOYEE CONTROLLER
================================ */

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    // ✅ Safety check (prevents mongoose validation crash)
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check duplicate user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      username: email.split("@")[0],
      email,
      password: hashedPassword,
      // role: role === "admin" ? "admin" : "user", // FIX
      role: role === "admin" ? "admin" : "employee",

      profileImage: req.file ? req.file.filename : "",
    });

    // Create employee
    await Employee.create({
      userId: user._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
    });
  } catch (error) {
    console.error("Add Employee Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");

    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Fetch employees failed",
    });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    let employee;
    employee = await Employee.findById(id)
      .populate("userId", { password: 0 })
      .populate("department");

    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Fetch employee failed",
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, maritalStatus, designation, department, salary } = req.body;

    // 1️⃣ Find employee
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // 2️⃣ Update user name
    await User.findByIdAndUpdate(employee.userId, { name }, { new: true });

    // 3️⃣ Update employee fields
    await Employee.findByIdAndUpdate(
      id,
      { maritalStatus, designation, salary, department },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.error("Update Employee Error:", error);
    return res.status(500).json({
      success: false,
      message: "Update employee failed",
    });
  }
};

const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Department ID is required",
    });
  }

  try {
    const employees = await Employee.find({ department: id });

    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error("Fetch employees by department error:", error);
    return res.status(500).json({
      success: false,
      message: "Fetch employees by department failed",
    });
  }
};

// Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    // 1️⃣ Find employee
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    // 2️⃣ Delete related data
    await Salary.deleteMany({ employeeId });
    await Leave.deleteMany({ employeeId });

    // 3️⃣ Delete user account
    await User.findByIdAndDelete(employee.userId);

    // 4️⃣ Delete employee
    await Employee.findByIdAndDelete(employeeId);

    return res.status(200).json({
      success: true,
      message: "Employee deleted completely",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Employee delete failed",
    });
  }
};

/* ===============================
   EXPORTS
================================ */

module.exports = {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
  deleteEmployee,
};
