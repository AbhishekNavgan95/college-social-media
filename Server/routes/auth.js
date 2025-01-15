// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const {
  signUp,
  sendOTP,
  login,
  checkEmailExist,
} = require("../controllers/AuthController");
const { auth } = require("../middleware/auth");

router.post("/sendOtp", sendOTP);
router.post("/signup", signUp);
router.post("/verifyEmail", checkEmailExist);
router.post("/login", login);

router.get("/test", auth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "User is authenticated",
  });
});

module.exports = router;
