const fs = require("fs");
const Slider = require("../models/Slider");
const cloudinary = require("../config/cloudinary");
const deleteCloudinaryImage = require("../utils/deleteCloudinaryImage");

const uploadImage = async (file) => {
  if (!file) return null;

  const result = await cloudinary.uploader.upload(file.path, {
    folder: "nurnobibamboocraft/sliders",
  });

  fs.unlinkSync(file.path);

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

const getSliders = async (req, res, next) => {
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
    next(error);
  }
};

const getAllSlidersAdmin = async (req, res, next) => {
  try {
    const sliders = await Slider.find().sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      sliders,
    });
  } catch (error) {
    next(error);
  }
};

const createSlider = async (req, res, next) => {
  try {
    const { title, subtitle, buttonText, buttonLink, order, isActive } =
      req.body;

    const image = await uploadImage(req.file);

    const slider = await Slider.create({
      title,
      subtitle,
      buttonText,
      buttonLink,
      order,
      isActive,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Slider created successfully",
      slider,
    });
  } catch (error) {
    next(error);
  }
};

const updateSlider = async (req, res, next) => {
  try {
    const slider = await Slider.findById(req.params.id);

    if (!slider) {
      res.status(404);
      throw new Error("Slider not found");
    }

    const fields = [
      "title",
      "subtitle",
      "buttonText",
      "buttonLink",
      "order",
      "isActive",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) slider[field] = req.body[field];
    });

    if (req.file) {
      await deleteCloudinaryImage(slider.image?.public_id);
      slider.image = await uploadImage(req.file);
    }

    const updatedSlider = await slider.save();

    res.json({
      success: true,
      message: "Slider updated successfully",
      slider: updatedSlider,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSlider = async (req, res, next) => {
  try {
    const slider = await Slider.findById(req.params.id);

    if (!slider) {
      res.status(404);
      throw new Error("Slider not found");
    }

    await deleteCloudinaryImage(slider.image?.public_id);
    await slider.deleteOne();

    res.json({
      success: true,
      message: "Slider deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSliders,
  getAllSlidersAdmin,
  createSlider,
  updateSlider,
  deleteSlider,
};
