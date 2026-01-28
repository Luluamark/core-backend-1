const Employee = require("../models/Employee");
const Leave = require("../models/Leave");

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const employee = await Employee.findOne({ userId });

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Leave request failed" });
  }
};

const getLeave = async (req, res) => {
  try {
    const userId = req.user.id;

    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    const leaves = await Leave.find({ employeeId: employee._id });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("GET MY LEAVES ERROR:", error);
    return res.status(500).json({ success: false });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name",
        },
      ],
    });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("GET ALL LEAVES ERROR:", error);
    return res.status(500).json({ success: false });
  }
};

module.exports = { addLeave, getLeave, getLeaves };
