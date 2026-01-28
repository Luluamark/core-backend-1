const User = require("../models/User");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        error: "Old password incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

module.exports = { changePassword };
