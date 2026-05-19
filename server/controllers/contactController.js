const ContactMessage = require("../models/ContactMessage");

const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, productName, message } = req.body;

    const contactMessage = await ContactMessage.create({
      name,
      email,
      phone,
      subject,
      productName,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contactMessage,
    });
  } catch (error) {
    next(error);
  }
};

const getContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    next(error);
  }
};

const markMessageAsRead = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      res.status(404);
      throw new Error("Message not found");
    }

    message.isRead = true;
    await message.save();

    res.json({
      success: true,
      message: "Message marked as read",
    });
  } catch (error) {
    next(error);
  }
};

const deleteContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      res.status(404);
      throw new Error("Message not found");
    }

    await message.deleteOne();

    res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContactMessage,
  getContactMessages,
  markMessageAsRead,
  deleteContactMessage,
};
