const DepartmentModel = require("../models/DepartmentModel");

// =======================
// GET ALL DEPARTMENTS
// =======================
const getDepartments = async (req, res) => {
  try {
    const departments = await DepartmentModel.find();
    return res.status(200).json({
      success: true,
      departments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Fetch departments failed",
    });
  }
};

// =======================
// ADD DEPARTMENT
// =======================
const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    const newDep = new DepartmentModel({
      dep_name,
      description,
    });

    await newDep.save();

    return res.status(200).json({
      success: true,
      department: newDep,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Add department server error",
    });
  }
};

// =======================
// GET DEPARTMENT BY ID
// =======================
const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await DepartmentModel.findById(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      department,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// =======================
// UPDATE DEPARTMENT
// =======================
const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;

    const updatedDepartment = await DepartmentModel.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true },
    );

    if (!updatedDepartment) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      department: updatedDepartment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Update department failed",
    });
  }
};

// =======================
// DELETE DEPARTMENT
// =======================
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDepartment = await DepartmentModel.findByIdAndDelete(id);

    if (!deletedDepartment) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      department: deletedDepartment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Delete department failed",
    });
  }
};

// =======================
// EXPORTS (IMPORTANT)
// =======================
module.exports = {
  getDepartments,
  addDepartment,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
