const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");

const seedAdmin = async (req, res, next) => {
  try {
    const seedKey = req.headers["x-seed-key"];

    if (seedKey !== process.env.ADMIN_SEED_KEY) {
      res.status(401);
      throw new Error("Invalid seed key");
    }

    const adminExists = await Admin.findOne({ email: req.body.email });

    if (adminExists) {
      res.status(400);
      throw new Error("Admin already exists with this email");
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Name, email and password are required");
    }

    const admin = await Admin.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin || !(await admin.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    res.json({
      success: true,
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAdminProfile = async (req, res, next) => {
  try {
    res.json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  seedAdmin,
  loginAdmin,
  getAdminProfile,
};
