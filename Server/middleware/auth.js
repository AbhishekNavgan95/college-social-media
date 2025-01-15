const jwt = require("jsonwebtoken");

// auth
exports.auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, "secret");

      console.log("decoded user : ", decode);
      req.user = decode;
      next();
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or expired",
      });
    }
  } catch (e) {
    console.log("Error while verifying the token: ", e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};
