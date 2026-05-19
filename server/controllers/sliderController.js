const fs = require("fs");
const path = require("path");
const Slider = require("../models/Slider");

const makeImageObject = (file) => {
  if (!file) {
    return {
      url: "",
      public_id: "",
    };
  }

  return {
    url: `/uploads/${file.filename}`,
    public_id: file.filename,
  };
};

const deleteLocalImage = (publicId) => {
  if (!publicId) return;

  const imagePath = path.join(__dirname, "../uploads", publicId);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
};

// Public sliders
const getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });

    res.json({
      success: true,
      sliders,
    });
  } catch (error) {
    console.log("Public slider load error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin sliders
const getAdminSliders = async (req, res) => {
  try {
    const sliders = await Slider.find({}).sort({
      order: 1,
      createdAt: -1,
    });

    res.json({
      success: true,
      sliders,
    });
  } catch (error) {
    console.log("Admin slider load error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createSlider = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      buttonText,
      buttonLink,
      order,
      isActive,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Slider title is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Slider image is required",
      });
    }

    const slider = await Slider.create({
      title,
      subtitle: subtitle || "",
      description: description || "",
      buttonText: buttonText || "Explore Products",
      buttonLink: buttonLink || "/products",
      order: Number(order) || 0,
      isActive: isActive === "false" ? false : true,
      image: makeImageObject(req.file),
    });

    res.status(201).json({
      success: true,
      message: "Slider created successfully",
      slider,
    });
  } catch (error) {
    console.log("Slider create error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateSlider = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);

    if (!slider) {
      return res.status(404).json({
        success: false,
        message: "Slider not found",
      });
    }

    const {
      title,
      subtitle,
      description,
      buttonText,
      buttonLink,
      order,
      isActive,
    } = req.body;

    if (title !== undefined) slider.title = title;
    if (subtitle !== undefined) slider.subtitle = subtitle;
    if (description !== undefined) slider.description = description;
    if (buttonText !== undefined) slider.buttonText = buttonText;
    if (buttonLink !== undefined) slider.buttonLink = buttonLink;
    if (order !== undefined) slider.order = Number(order) || 0;

    if (isActive !== undefined) {
      slider.isActive = isActive === "false" ? false : true;
    }

    if (req.file) {
      deleteLocalImage(slider.image?.public_id);
      slider.image = makeImageObject(req.file);
    }

    await slider.save();

    res.json({
      success: true,
      message: "Slider updated successfully",
      slider,
    });
  } catch (error) {
    console.log("Slider update error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);

    if (!slider) {
      return res.status(404).json({
        success: false,
        message: "Slider not found",
      });
    }

    deleteLocalImage(slider.image?.public_id);

    await slider.deleteOne();

    res.json({
      success: true,
      message: "Slider deleted successfully",
    });
  } catch (error) {
    console.log("Slider delete error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSliders,
  getAdminSliders,
  createSlider,
  updateSlider,
  deleteSlider,
};
