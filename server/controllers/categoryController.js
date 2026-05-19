const fs = require("fs");
const Category = require("../models/Category");
const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const deleteCloudinaryImage = require("../utils/deleteCloudinaryImage");

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const uploadImage = async (file) => {
  if (!file) return null;

  const result = await cloudinary.uploader.upload(file.path, {
    folder: "nurnobibamboocraft/categories",
  });

  fs.unlinkSync(file.path);

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });

    res.json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategoriesAdmin = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, description, order, isActive } = req.body;

    let slug = req.body.slug || slugify(name);

    const exists = await Category.findOne({ slug });
    if (exists) slug = `${slug}-${Date.now()}`;

    const image = await uploadImage(req.file);

    const category = await Category.create({
      name,
      slug,
      description,
      order,
      isActive,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    const { name, description, order, isActive } = req.body;

    if (name) category.name = name;
    if (req.body.slug) category.slug = slugify(req.body.slug);
    if (description !== undefined) category.description = description;
    if (order !== undefined) category.order = order;
    if (isActive !== undefined) category.isActive = isActive;

    if (req.file) {
      await deleteCloudinaryImage(category.image?.public_id);
      category.image = await uploadImage(req.file);
    }

    const updatedCategory = await category.save();

    res.json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    const productCount = await Product.countDocuments({
      category: category._id,
    });

    if (productCount > 0) {
      res.status(400);
      throw new Error(
        "Cannot delete category. Products exist under this category.",
      );
    }

    await deleteCloudinaryImage(category.image?.public_id);
    await category.deleteOne();

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getAllCategoriesAdmin,
  createCategory,
  updateCategory,
  deleteCategory,
};
