const express = require("express");

const {
  getSliders,
  getAdminSliders,
  createSlider,
  updateSlider,
  deleteSlider,
} = require("../controllers/sliderController");

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getSliders);
router.get("/admin/all", protect, getAdminSliders);

router.post("/", protect, upload.single("image"), createSlider);
router.put("/:id", protect, upload.single("image"), updateSlider);
router.delete("/:id", protect, deleteSlider);

module.exports = router;
