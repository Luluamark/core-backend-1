const Employee = require("../models/Employee");
const DepartmentModel = require("../models/DepartmentModel");
const Leave = require("../models/Leave");

const getSummary = async (req, res) => {
  try {
    const totalEmployee = await Employee.countDocuments();
    const totalDepartments = await DepartmentModel.countDocuments();
    const totalSalaries = await Employee.aggregate([
      { $group: { _id: null, totalSalary: { $sum: "$salary" } } },
    ]);
    const leavesAppliedFor = await Leave.distinct("employeeId");

    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const leaveSummary = {
      appliedFor: leavesAppliedFor.length,

      approved: leaveStatus.find((item) => item._id === "Approved")?.count || 0,
      rejected: leaveStatus.find((item) => item._id === "Rejected")?.count || 0,
      pending: leaveStatus.find((item) => item._id === "Pending")?.count || 0,
    };

    return res.status(200).json({
      success: true,
      totalEmployee,
      totalDepartments,
      totalSalary: totalSalaries[0]?.totalSalary || 0,
      leaveSummary,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Admin dashboard summary error" });
  }
};

module.exports = {
  getSummary,
};
