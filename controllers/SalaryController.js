const Salary = require("../models/Salary");
const Employee = require("../models/Employee");

// const addSalary = async (req, res) => {
//   try {
//     const {
//       employeeId,
//       basicSalary,
//       allowances,
//       deductions,

//       payDate,
//     } = req.body;

//     const totalSalary =
//       parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

//     const newSalary = new Salary({
//       employeeId,
//       basicSalary: Number(basicSalary),
//       allowances: Number(allowances),
//       deductions: Number(deductions),
//       netSalary: totalSalary,
//       payDate,
//     });

//     await newSalary.save();

//     return res.status(200).json({ success: true });
//   } catch (error) {
//     return res.status(500).json({ success: false, error: "Salary add failed" });
//   }
// };

// const addSalary = async (req, res) => {
//   try {
//     const {
//       employeeId: empCode,
//       basicSalary,
//       allowances,
//       deductions,
//       payDate,
//     } = req.body;

//     // Find the employee by employeeId (string)
//     const employee = await Employee.findOne({ employeeId: empCode });
//     if (!employee) {
//       return res
//         .status(404)
//         .json({ success: false, error: "Employee not found" });
//     }

//     const totalSalary =
//       Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);

//     const newSalary = new Salary({
//       employeeId: employee._id, // ✅ Use ObjectId
//       basicSalary: Number(basicSalary),
//       allowances: Number(allowances),
//       deductions: Number(deductions),
//       netSalary: totalSalary,
//       payDate,
//     });

//     await newSalary.save();

//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, error: "Salary add failed" });
//   }
// };

const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } =
      req.body;

    // employeeId is already the Employee._id sent from front-end
    const employee = await Employee.findById(employeeId); // ✅ use findById
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    const totalSalary =
      Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);

    const newSalary = new Salary({
      employeeId: employee._id, // ObjectId
      basicSalary: Number(basicSalary),
      allowances: Number(allowances),
      deductions: Number(deductions),
      netSalary: totalSalary,
      payDate,
    });

    await newSalary.save();

    const savedSalary = await newSalary.save();
    console.log("Salary saved:", savedSalary); // ✅ log saved record

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Salary add failed" });
  }
};

//   try {
//     const { id, role } = req.params;

//     let salary;

//     if (role === "admin") {
//       salary = await Salary.find({ employeeId: id }).populate(
//         "employeeId",
//         "employeeId",
//       );
//     } else {
//       const employee = await Employee.findOne({ userId: id });
//       salary = await Salary.find({ employeeId: employee._id }).populate(
//         "employeeId",
//         "employeeId",
//       );
//     }

//     return res.status(200).json({ success: true, salary });
//   } catch (error) {
//     return res.status(500).json({ success: false, error: "Salary add error" });
//   }
// };

// const getEmployeeSalary = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const employee = await Employee.findOne({ userId });
//     if (!employee) {
//       return res
//         .status(404)
//         .json({ success: false, error: "Employee not found" });
//     }

//     const salaries = await Salary.find({
//       employeeId: employee._id,
//     }).populate("employeeId", "employeeId");

//     return res.json({ success: true, salary: salaries });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, error: "Salary fetch failed" });
//   }
// };
// getSalary
// const getSalary = async (req, res) => {
//   try {
//     const { id, role } = req.params;

//     let salary;

//     const employees = await Employee.find(); // all employees
//     const employeeIds = employees.map((emp) => emp._id); // array of ObjectIds

//     salary = await Salary.find({ employeeId: { $in: employeeIds } }).populate(
//       "employeeId",
//       "employeeId",
//     );

//     return res.status(200).json({ success: true, salary });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, error: "Salary fetch failed" });
//   }
// };
// ADMIN → salaries by employeeId
// const getSalary = async (req, res) => {
//   try {
//     const { id } = req.params; // employeeId

//     const salary = await Salary.find({ employeeId: id }).populate(
//       "employeeId",
//       "employeeId",
//     );

//     return res.status(200).json({
//       success: true,
//       salary,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       error: "Salary fetch failed",
//     });
//   }
// };

// const getEmployeeSalary = async (req, res) => {
//   try {
//     const userId = req.params.id; // User._id

//     // find employee linked to this user
//     const employee = await Employee.findOne({ userId }).select("_id");

//     // if not found, return empty array instead of 404
//     if (!employee) {
//       return res.status(200).json({ success: true, salary: [] });
//     }

//     const salaries = await Salary.find({ employeeId: employee._id }).populate(
//       "employeeId",
//       "employeeId",
//     );

//     return res.status(200).json({ success: true, salary: salaries });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, error: "Salary fetch failed" });
//   }
// };
const getSalary = async (req, res) => {
  try {
    const { id } = req.params;

    let employee = await Employee.findById(id);
    if (!employee) {
      employee = await Employee.findOne({ employeeId: id });
    }

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    const salary = await Salary.find({ employeeId: employee._id }).populate(
      "employeeId",
      "employeeId userId",
    );

    return res.status(200).json({ success: true, salary });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Salary fetch failed" });
  }
};

const getEmployeeSalary = async (req, res) => {
  try {
    const userId = req.params.id;

    const employee = await Employee.findOne({ userId }).select("_id");

    if (!employee) {
      return res.status(200).json({ success: true, salary: [] });
    }

    const salary = await Salary.find({
      employeeId: employee._id,
    }).populate("employeeId", "employeeId");

    return res.status(200).json({ success: true, salary });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Salary fetch failed",
    });
  }
};

module.exports = { addSalary, getSalary, getEmployeeSalary };
