const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeId: { type: String, required: true, unique: true },
    dob: Date,
    gender: String,
    maritalStatus: String,
    designation: String,
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    salary: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Employee", employeeSchema);
