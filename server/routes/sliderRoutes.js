const express = require("express");
const {
  getSliders,
  getAllSlidersAdmin,
  createSlider,
  updateSlider,
  deleteSlider,
} = require("../controllers/sliderController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getSliders);
router.get("/admin/all", protect, getAllSlidersAdmin);
router.post("/", protect, upload.single("image"), createSlider);
router.put("/:id", protect, upload.single("image"), updateSlider);
router.delete("/:id", protect, deleteSlider);

module.exports = router;
