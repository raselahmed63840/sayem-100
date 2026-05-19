const express = require("express");

const {
  seedAdmin,
  loginAdmin,
  getAdminProfile,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Admin route is working",
  });
});

router.post("/seed", seedAdmin);
router.post("/login", loginAdmin);
router.get("/profile", protect, getAdminProfile);

module.exports = router;
