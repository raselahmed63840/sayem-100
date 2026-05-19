const dns = require("dns");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Admin = require("./models/Admin");
const generateToken = require("./utils/generateToken");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// DNS settings for MongoDB Atlas stability
dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");

const app = express();

/* =========================
   CORS
========================= */

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://nurnobibamboocraft.com",
  "https://www.nurnobibamboocraft.com",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

/* =========================
   BASIC MIDDLEWARE
========================= */

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =========================
   TEST ROUTES
========================= */

app.get("/", (req, res) => {
  res.send("Nurnobi Bamboo Craft API is running");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
  });
});

/* =========================
   ADMIN AUTH MIDDLEWARE
========================= */

const protectAdmin = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token failed",
    });
  }
};

/* =========================
   ADMIN ROUTES
========================= */

// Admin route test
app.get("/api/admin/test", (req, res) => {
  res.json({
    success: true,
    message: "Admin route is working directly from server.js",
  });
});

// Admin create / password reset
// This uses findOneAndUpdate so Admin.js pre-save hook will not double-hash password.
app.post("/api/admin/seed", async (req, res) => {
  try {
    const seedKey = req.headers["x-seed-key"];

    if (seedKey !== process.env.ADMIN_SEED_KEY) {
      return res.status(401).json({
        success: false,
        message: "Invalid seed key",
      });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.findOneAndUpdate(
      { email: cleanEmail },
      {
        $set: {
          name,
          email: cleanEmail,
          password: hashedPassword,
          role: "admin",
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Admin created/password reset successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Admin login
app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const cleanEmail = email.toLowerCase().trim();

    const admin = await Admin.findOne({ email: cleanEmail });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Admin profile
app.get("/api/admin/profile", protectAdmin, async (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
});

/* =========================
   MAIN API ROUTES
========================= */

app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/sliders", require("./routes/sliderRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/company", require("./routes/companyRoutes"));
app.use("/api/clients", require("./routes/clientRoutes"));

/* =========================
   ERROR MIDDLEWARE
========================= */

app.use(notFound);
app.use(errorHandler);

/* =========================
   DATABASE + SERVER START
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB error:", error.message);
  });
