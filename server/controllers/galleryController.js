const fs = require("fs");
const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");
const deleteCloudinaryImage = require("../utils/deleteCloudinaryImage");

const uploadImage = async (file) => {
  if (!file) return null;

  const result = await cloudinary.uploader.upload(file.path, {
    folder: "nurnobibamboocraft/gallery",
  });

  fs.unlinkSync(file.path);

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

const getGallery = async (req, res, next) => {
  try {
    const gallery = await Gallery.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });

    res.json({
      success: true,
      gallery,
    });
  } catch (error) {
    next(error);
  }
};

const getAllGalleryAdmin = async (req, res, next) => {
  try {
    const gallery = await Gallery.find().sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      gallery,
    });
  } catch (error) {
    next(error);
  }
};

const createGallery = async (req, res, next) => {
  try {
    const { title, type, order, isActive } = req.body;

    const image = await uploadImage(req.file);

    const galleryItem = await Gallery.create({
      title,
      type,
      order,
      isActive,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Gallery image created successfully",
      gallery: galleryItem,
    });
  } catch (error) {
    next(error);
  }
};

const updateGallery = async (req, res, next) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      res.status(404);
      throw new Error("Gallery item not found");
    }

    const fields = ["title", "type", "order", "isActive"];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) galleryItem[field] = req.body[field];
    });

    if (req.file) {
      await deleteCloudinaryImage(galleryItem.image?.public_id);
      galleryItem.image = await uploadImage(req.file);
    }

    const updatedGallery = await galleryItem.save();

    res.json({
      success: true,
      message: "Gallery item updated successfully",
      gallery: updatedGallery,
    });
  } catch (error) {
    next(error);
  }
};

const deleteGallery = async (req, res, next) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      res.status(404);
      throw new Error("Gallery item not found");
    }

    await deleteCloudinaryImage(galleryItem.image?.public_id);
    await galleryItem.deleteOne();

    res.json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGallery,
  getAllGalleryAdmin,
  createGallery,
  updateGallery,
  deleteGallery,
};
