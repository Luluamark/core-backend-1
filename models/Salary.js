const mongoose = require("mongoose");

//

// const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
  {
    employeeId: {
      // type: String, // ← change from ObjectId to String
      // required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    basicSalary: { type: Number, required: true },
    allowances: { type: Number },
    deductions: { type: Number },
    netSalary: { type: Number },
    payDate: { type: Date, required: true },
  },
  { timestamps: true },
);

const Salary = mongoose.model("Salary", salarySchema);

module.exports = Salary;
