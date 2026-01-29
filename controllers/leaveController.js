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
      return res.status(404).json({
        success: false,
        error: "Employee profile not found for this user",
      });
    }

    const leaves = await Leave.find({ employeeId: employee._id });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("GET MY LEAVES ERROR:", error);
    return res.status(500).json({ success: false });
  }
};

// const getLeave = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;

//     let leaves = await Leave.find({ employeeId: id });
//     if (!leaves || leaves.length === 0) {
//       const employee = await Employee.findOne({ userId });
//       leaves = await Leave.find({ employeeId: employee._id });
//     }

//     return res.status(200).json({ success: true, leaves });
//   } catch (error) {
//     console.error("GET MY LEAVES ERROR:", error);
//     return res.status(500).json({ success: false });
//   }
// };

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

const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name, profileImage",
        },
      ],
    });

    return res.status(200).json({ success: true, leave });
  } catch (error) {
    console.error("GET ALL LEAVES ERROR:", error);
    return res.status(500).json({ success: false });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate(
      { _id: id },
      { status: req.body.status },
    );
    if (!leave) {
      return res.status(500).json({ success: false, error: "leave not found" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "leave update server error" });
  }
};

module.exports = { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave };
