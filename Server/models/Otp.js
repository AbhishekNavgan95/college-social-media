const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true
    },
    otp: {
      type: String,
      required: true,
      trim: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Otp", OtpSchema);