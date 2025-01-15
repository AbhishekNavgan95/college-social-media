const Otp = require("../models/Otp");
const User = require("../models/User");
const otpTemplate = require("../templates/otpTemplate");
const otpGenerator = require("otp-generator");
const mailSender = require("../cofig/mailSender");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// SEND OTP ✅
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "email is required",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    try {
      const tamplate = otpTemplate(email, otp);

      const mailResponse = await mailSender(
        email,
        "Email Varification",
        tamplate
      );
    } catch (e) {
      console.log("error occurred while sending the email");
      throw e;
    }

    const Createdotp = await Otp.create({
      email: email,
      otp: otp,
    });

    res.status(200).json({
      success: true,
      message: "Otp sent successfully",
      data: Createdotp,
    });
  } catch (e) {
    console.log("error while sending otp ", e);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// SIGN UP ✅
exports.signUp = async (req, res) => {
  try {
    const { email, password, prn, name, userName, otp } = req.body;

    if (!email || !password || !prn || !name || !userName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const ifExists = await User.findOne({ email, userName });

    if (ifExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const otpData = await Otp.findOne({ email });

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: "Otp not found",
      });
    }

    if (!otpData?.otp === otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid otp",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      prn,
      name,
      username: userName,
    });

    return res
      .status(201)
      .json({ success: true, message: "User created Succefully", data: user });
  } catch (e) {
    console.log("error while signing up ", e);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// LOG IN ✅
exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log("email", email);
  console.log("password", password);

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    console.log("User :" + user)

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials, password incorrect",
      });
    }

    const token = jwt.sign(
      { email: user?.email, userName: user?.username },
      "secret",
    );

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
      token,
    });
  } catch (e) {
    console.log("error while logging in ", e);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// VERIFY EMAIL ✅
exports.checkEmailExist = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (e) {
    console.log("error while checking email ", e);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
