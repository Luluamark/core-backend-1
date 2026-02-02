const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

const getAttendance = async (req, res) => {
  try {
    const date = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.find({ data: date }).populate({
      path: "employeeId",
      populate: [{ path: "department" }, { path: "userId" }],
    });

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.error("Attendance fetch error:", error); // 🔥 log full error
    res.status(500).json({ success: false, message: error.message });
  }
};

//     const { status } = req.body;
//     const date = new Date().toISOString().split("T")[0];
//     const employee = await Employee.findOne(employeeId);

//     const attendance = await Attendance.findByIdAndUpdate(
//       // { employeeId: employee._id, date },
//       { employeeId, data: date }, // find today's record for this employee
//       { status },
//       { new: true },
//     );

//     res.status(200).json({ success: true, attendance });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const updateAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { status } = req.body;
    const date = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOneAndUpdate(
      { employeeId, data: date },
      { status },
      { new: true },
    );

    if (!attendance) {
      return res
        .status(404)
        .json({ success: false, message: "Attendance not found for today" });
    }

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.error("Attendance update error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// const attendanceReport = async () => {
//   try {
//     const { date, limit = 5, skip = 0 } = req.query;
//     const query = {};

//     if (date) {
//       query.date = date;
//     }

//     const attendenceData = await Attendance.find(query)
//       .populate({
//         path: "employeeId",
//         populate: ["department", "userId"],
//       })
//       .sort({ date: -1 })
//       .limit(parseInt(limit))
//       .skip(parseInt(skip));

//     const groupData = attendenceData.reduce((result, record) => {
//       if (!result[record.date]) {
//         result[record.date] = [];
//       }
//       result[record.date].push({
//         employeeId: record.employeeId.employeeId,
//         employeeName: record.employeeId.userId.name,
//         departmentName: record.employeeId.department.dep_name,
//         status: record.status || "Not Marked",
//       });
//       return result;
//     }, {});
//     return res.status(201).json({ success: true, groupData });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
const attendanceReport = async (req, res) => {
  try {
    const { date, limit = 5, skip = 0 } = req.query;

    const query = {};

    // ⚠️ your schema uses "data", not "date"
    if (date) {
      query.data = date;
    }

    const attendanceData = await Attendance.find(query)
      .populate({
        path: "employeeId",
        populate: [{ path: "department" }, { path: "userId" }],
      })
      .sort({ data: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const groupData = attendanceData.reduce((result, record) => {
      const day = record.data;

      if (!result[day]) result[day] = [];

      result[day].push({
        employeeId: record.employeeId.employeeId,
        employeeName: record.employeeId.userId?.name || "N/A",
        departmentName: record.employeeId.department?.dep_name || "N/A",
        status: record.status || "Not Marked",
      });

      return result;
    }, {});

    res.status(200).json({ success: true, groupData });
  } catch (error) {
    console.error("Attendance report error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAttendance,
  updateAttendance,
  attendanceReport,
};
