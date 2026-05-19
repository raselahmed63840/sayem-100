const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token === "local-admin-token") {
      req.admin = {
        _id: "local-admin",
        name: "Rasel Ahmed",
        email: "rasel63840@gmail.com",
        role: "admin",
      };

      return next();
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { protect };
