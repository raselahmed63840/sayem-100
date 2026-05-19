const express = require("express");
const {
  getCompanyInfo,
  updateCompanyInfo,
} = require("../controllers/companyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getCompanyInfo);
router.put("/", protect, updateCompanyInfo);

module.exports = router;
