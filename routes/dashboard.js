const express = require("express");
const authMiddleware = require("../server/middleware/authMiddleware");
const { getSummary } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/summary", authMiddleware, getSummary);

module.exports = router;
