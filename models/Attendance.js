const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Sick", "Leave"],
    default: null,
  },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
