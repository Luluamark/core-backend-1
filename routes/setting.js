const express = require("express");
const router = express.Router();

const authMiddleware = require("../server/middleware/authMiddleware");
const { changePassword } = require("../controllers/settingController");

router.put("/change-password", authMiddleware, changePassword);

module.exports = router;
