const express = require("express");
const {
  createContactMessage,
  getContactMessages,
  markMessageAsRead,
  deleteContactMessage,
} = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createContactMessage);
router.get("/messages", protect, getContactMessages);
router.patch("/messages/:id/read", protect, markMessageAsRead);
router.delete("/messages/:id", protect, deleteContactMessage);

module.exports = router;
