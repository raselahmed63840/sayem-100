const express = require("express");
const {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

router.post("/", protect, upload.array("images", 10), createProduct);
router.put("/:id", protect, upload.array("images", 10), updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
