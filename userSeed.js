const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const User = require("./models/User");
const bcrypt = require("bcrypt");
const connectDB = require("./db/db");

const userRegister = async () => {
  await connectDB();

  try {
    const hashPassword = await bcrypt.hash("password123", 10);

    const newUser = new User({
      username: "admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });

    await newUser.save();
    console.log("✅ Admin user created successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

userRegister();
