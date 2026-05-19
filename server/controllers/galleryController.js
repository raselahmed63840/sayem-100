const fs = require("fs");
const path = require("path");
const Gallery = require("../models/Gallery");

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

const getGallery = async (req, res) => {
  try {
    const { type, limit = 1000 } = req.query;

    const filter = {
      isActive: true,
    };

    if (type && type !== "all") {
      filter.type = type;
    }

    const gallery = await Gallery.find(filter)
      .populate("product", "title slug")
      .sort({ order: 1, createdAt: -1 })
      .limit(Number(limit));

    res.json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.log("Public gallery load error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAdminGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({})
      .populate("product", "title slug")
      .sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.log("Admin gallery load error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createGallery = async (req, res) => {
  try {
    const { title, type, product, order, isActive } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Gallery title is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Gallery image is required",
      });
    }

    const galleryItem = await Gallery.create({
      title,
      type: type || "product",
      product: product || null,
      order: Number(order) || 0,
      isActive: isActive === "false" ? false : true,
      image: makeImageObject(req.file),
    });

    res.status(201).json({
      success: true,
      message: "Gallery image added successfully",
      gallery: galleryItem,
    });
  } catch (error) {
    console.log("Gallery create error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateGallery = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    const { title, type, product, order, isActive } = req.body;

    if (title !== undefined) galleryItem.title = title;
    if (type !== undefined) galleryItem.type = type;
    if (product !== undefined) galleryItem.product = product || null;
    if (order !== undefined) galleryItem.order = Number(order) || 0;
    if (isActive !== undefined) {
      galleryItem.isActive = isActive === "false" ? false : true;
    }

    if (req.file) {
      deleteLocalImage(galleryItem.image?.public_id);
      galleryItem.image = makeImageObject(req.file);
    }

    await galleryItem.save();

    res.json({
      success: true,
      message: "Gallery image updated successfully",
      gallery: galleryItem,
    });
  } catch (error) {
    console.log("Gallery update error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteGallery = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    deleteLocalImage(galleryItem.image?.public_id);

    await galleryItem.deleteOne();

    res.json({
      success: true,
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    console.log("Gallery delete error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getGallery,
  getAdminGallery,
  createGallery,
  updateGallery,
  deleteGallery,
};
