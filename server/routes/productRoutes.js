const express = require("express");
const {
  getProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.get("/slug/:slug", getProductBySlug);
router.get("/:id", getProductById);

router.post("/", protect, upload.array("images", 10), createProduct);
router.put("/:id", protect, upload.array("images", 10), updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
