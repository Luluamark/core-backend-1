const Attendance = require("../../models/Attendance");
const Employee = require("../../models/Employee");

const defaultAttendance = async (req, res, next) => {
  try {
    const date = new Date().toISOString().split("T")[0];
    const existingAttendance = await Attendance.findOne({ data: date });

    if (!existingAttendance) {
      const employees = await Employee.find({});
      const attendance = employees.map((employee) => ({
        // data,
        data: date,
        employeeId: employee._id,
        status: null,
      }));

      await Attendance.insertMany(attendance);
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

module.exports = defaultAttendance;
