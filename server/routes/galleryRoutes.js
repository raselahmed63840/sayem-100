const express = require("express");
const {
  getGallery,
  getAllGalleryAdmin,
  createGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getGallery);
router.get("/admin/all", protect, getAllGalleryAdmin);
router.post("/", protect, upload.single("image"), createGallery);
router.put("/:id", protect, upload.single("image"), updateGallery);
router.delete("/:id", protect, deleteGallery);

module.exports = router;
