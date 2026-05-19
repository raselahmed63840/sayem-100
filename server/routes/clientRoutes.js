const express = require("express");
const {
  getClients,
  getAllClientsAdmin,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getClients);
router.get("/admin/all", protect, getAllClientsAdmin);
router.post("/", protect, upload.single("logo"), createClient);
router.put("/:id", protect, upload.single("logo"), updateClient);
router.delete("/:id", protect, deleteClient);

module.exports = router;
