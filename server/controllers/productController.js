const fs = require("fs");
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

const uploadProductImages = async (files = []) => {
  const images = [];

  for (const file of files) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "nurnobi-bamboo-craft/products",
    });

    fs.unlinkSync(file.path);

    images.push({
      url: result.secure_url,
      public_id: result.public_id,
    });
  }

  return images;
};

const getProducts = async (req, res, next) => {
  try {
    const {
      category,
      search,
      featured,
      status,
      page = 1,
      limit = 12,
    } = req.query;

    const query = {};

    if (category) query.category = category;
    if (featured === "true") query.isFeatured = true;

    if (status && status !== "all") {
      query.status = status;
    } else if (!status) {
      query.status = "active";
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .populate("category", "name slug")
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      count: products.length,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      status: "active",
    }).populate("category", "name slug");

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name slug",
    );

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      category,
      productType,
      shortDescription,
      description,
      material,
      scientificName,
      origin,
      color,
      size,
      moq,
      capacity,
      leadTime,
      priceType,
      usage,
      buyerRequirement,
      isFeatured,
      status,
      order,
    } = req.body;

    let slug = req.body.slug || slugify(title);

    const exists = await Product.findOne({ slug });
    if (exists) slug = `${slug}-${Date.now()}`;

    const images = await uploadProductImages(req.files || []);

    const product = await Product.create({
      title,
      slug,
      category,
      productType,
      shortDescription,
      description,
      material,
      scientificName,
      origin,
      color,
      size,
      moq,
      capacity,
      leadTime,
      priceType,
      usage,
      buyerRequirement,
      images,
      thumbnail: images[0] || null,
      isFeatured,
      status,
      order,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const fields = [
      "title",
      "category",
      "productType",
      "shortDescription",
      "description",
      "material",
      "scientificName",
      "origin",
      "color",
      "size",
      "moq",
      "capacity",
      "leadTime",
      "priceType",
      "usage",
      "buyerRequirement",
      "isFeatured",
      "status",
      "order",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    if (req.body.slug) {
      product.slug = slugify(req.body.slug);
    }

    if (req.files && req.files.length > 0) {
      for (const img of product.images) {
        await deleteCloudinaryImage(img.public_id);
      }

      const images = await uploadProductImages(req.files);
      product.images = images;
      product.thumbnail = images[0] || null;
    }

    const updatedProduct = await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    for (const img of product.images) {
      await deleteCloudinaryImage(img.public_id);
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
