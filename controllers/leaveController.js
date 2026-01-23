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

const getLeaves = async (req, res) => {
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

const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employeeId", "name email");

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("GET ALL LEAVES ERROR:", error);
    return res.status(500).json({ success: false });
  }
};

module.exports = { addLeave, getLeaves, getAllLeaves };

// const Employee = require("../models/Employee");
// const Leave = require("../models/Leave");

// const addLeave = async (req, res) => {
//   try {
//     const { leaveType, startDate, endDate, reason } = req.body;

//     // ✅ get logged-in user id from token
//     const userId = req.user.id;

//     // ✅ find employee linked to this user
//     const employee = await Employee.findOne({ userId });

//     if (!employee) {
//       return res
//         .status(404)
//         .json({ success: false, error: "Employee not found" });
//     }

//     const newLeave = new Leave({
//       employeeId: employee._id, // ✅ CORRECT ID
//       leaveType,
//       startDate,
//       endDate,
//       reason,
//     });

//     await newLeave.save();

//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("ADD LEAVE ERROR:", error);
//     return res
//       .status(500)
//       .json({ success: false, error: "Leave request failed" });
//   }
// };

// const getLeaves = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const employee = await Employee.findOne({ userId: id });
//     const leaves = await Leave.find({ employeeId: employee._id });

//     return res.status(200).json({ success: true, leaves });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, error: "leave add server error" });
//   }
// };

// module.exports = { addLeave, getLeaves };
