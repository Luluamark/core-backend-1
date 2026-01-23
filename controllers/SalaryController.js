const Salary = require("../models/Salary");
const Employee = require("../models/Employee");

const addSalary = async (req, res) => {
  try {
    const {
      employeeId,
      basicSalary,
      allowances,
      deductions,

      payDate,
    } = req.body;

    const totalSalary =
      parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate,
    });

    await newSalary.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Salary add failed" });
  }
};

const getSalary = async (req, res) => {
  try {
    const { id } = req.params;

    let salary;
    salary = await Salary.find({ employeeId: id });
    if (!salary || salary.length < 1) {
      const employee = await Employee.findOne({ userId: id });
      salary = await Salary.find({ employeeId: employee._id }).populate(
        "employeeId",
        "employeeId",
      );
    }

    return res.status(200).json({ success: true, salary });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Salary add error" });
  }
};

// const getEmployeeSalary = async (req, res) => {
//   const salaries = await Salary.find({ employeeId: req.params.id });
//   res.json({ success: true, salary: salaries });
// };
const getEmployeeSalary = async (req, res) => {
  try {
    const userId = req.params.id;

    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    const salaries = await Salary.find({
      employeeId: employee._id,
    });

    return res.json({ success: true, salary: salaries });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Salary fetch failed" });
  }
};

module.exports = { addSalary, getSalary, getEmployeeSalary };
