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

// const getLeave = async (req, res) => {
//   try {
//     let leaves;
//     const { userId, role } = req.user.id;

//     if (role === "admin") {
//       leaves = await Leave.find({ employeeId: employee._id });
//     } else {
//       const employee = await Employee.findOne({ userId });
//     }

//     if (!employee) {
//       return res.status(404).json({
//         success: false,
//         error: "Employee profile not found for this user",
//       });
//     }

//     return res.status(200).json({ success: true, leaves });
//   } catch (error) {
//     console.error("GET MY LEAVES ERROR:", error);
//     return res.status(500).json({ success: false });
//   }
// };

// const getLeave = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const role = req.user.role;

//     let leaves;

//     if (role === "admin") {
//       leaves = await Leave.find();
//     } else {
//       const employee = await Employee.findOne({ userId });

//       if (!employee) {
//         return res.status(404).json({
//           success: false,
//           error: "Employee profile not found",
//         });
//       }

//       leaves = await Leave.find({ employeeId: employee._id });
//     }

//     return res.status(200).json({ success: true, leaves });
//   } catch (error) {
//     console.error("GET MY LEAVES ERROR:", error);
//     return res.status(500).json({ success: false });
//   }
// };

const getLeave = async (req, res) => {
  try {
    const { id, role } = req.params; // params from frontend
    let leaves;

    if (role === "admin") {
      leaves = await Leave.find().populate({
        path: "employeeId",
        populate: [
          { path: "userId", select: "name" },
          { path: "department", select: "dep_name" },
        ],
      });
    } else {
      const employee = await Employee.findOne({ userId: id });
      if (!employee) {
        return res.status(200).json({ success: true, leaves: [] });
      }

      leaves = await Leave.find({ employeeId: employee._id }).populate({
        path: "employeeId",
        populate: [
          { path: "userId", select: "name" },
          { path: "department", select: "dep_name" },
        ],
      });
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error(error);
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
          select: "name profileImage",
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
