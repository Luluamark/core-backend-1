const cors = require("cors");
const express = require("express");
const compression = require("compression");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const departmentRouter = require("./routes/department");
const employeeRouter = require("./routes/employee");
const SalaryRouter = require("./routes/salary");
const LeaveRouter = require("./routes/leave");
const settingRouter = require("./routes/setting");
const attendanceRouter = require("./routes/attendance");
const dashboardRouter = require("./routes/dashboard");

const connectDB = require("./db/db");

dotenv.config({ path: "./config.env" });

console.log("DB URI:", process.env.DATABASE);

const app = express();

/* =======================
   GLOBAL MIDDLEWARE
======================= */

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  }),
);

// Body parser
app.use(express.json());
app.use(compression());

/* =======================
   DATABASE
======================= */
connectDB();

/* =======================
   STATIC FILES
======================= */

/* =======================
   ROUTES
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", SalaryRouter);
app.use("/api/leave", LeaveRouter);
app.use("/api/setting", settingRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/dashboard", dashboardRouter);

/* =======================
   TEST ROUTE
======================= */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello, World from server side!",
    app: "backend",
  });
});

/* =======================
   SERVER
======================= */

// No Need For Netlify
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

module.exports = app;
