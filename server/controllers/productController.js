const fs = require("fs");
const path = require("path");
const Product = require("../models/Product");
const Category = require("../models/Category");

const makeSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

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

const getProducts = async (req, res) => {
  try {
    const { status, category, featured, limit = 1000 } = req.query;

    const filter = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    if (!status) {
      filter.status = "active";
    }

    if (category) {
      filter.category = category;
    }

    if (featured === "true") {
      filter.isFeatured = true;
    }

    const products = await Product.find(filter)
      .populate("category", "name slug")
      .sort({ order: 1, createdAt: -1 })
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      total,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      status: "active",
    }).populate("category", "name slug");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
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
      isFeatured,
      status,
      order,
    } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required",
      });
    }

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid category selected",
      });
    }

    const finalSlug = slug ? makeSlug(slug) : makeSlug(title);

    const exists = await Product.findOne({ slug: finalSlug });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Product already exists with this slug",
      });
    }

    const uploadedImages = req.files?.length
      ? req.files.map((file) => makeImageObject(file))
      : [];

    const product = await Product.create({
      title,
      slug: finalSlug,
      category,
      productType: productType || "",
      shortDescription: shortDescription || "",
      description: description || "",
      material: material || "Bamboo",
      scientificName: scientificName || "Bambusa Vulgaris",
      origin: origin || "Bangladesh",
      color: color || "Natural / Any Color",
      size: size || "As per buyer requirements",
      moq: moq || "500-3000 pcs",
      capacity: capacity || "20000 pcs / 90 days handmade",
      leadTime: leadTime || "60-90 days",
      priceType: priceType || "FOB",
      usage: usage || "",
      buyerRequirement:
        buyerRequirement ||
        "Customization available as per buyer requirements.",
      images: uploadedImages,
      thumbnail: uploadedImages[0] || { url: "", public_id: "" },
      isFeatured: isFeatured === "true" || isFeatured === true,
      status: status || "active",
      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log("Product create error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {
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
      isFeatured,
      status,
      order,
    } = req.body;

    if (category) {
      const categoryExists = await Category.findById(category);

      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid category selected",
        });
      }

      product.category = category;
    }

    if (title !== undefined) product.title = title;
    if (slug !== undefined && slug) product.slug = makeSlug(slug);
    if (productType !== undefined) product.productType = productType;
    if (shortDescription !== undefined)
      product.shortDescription = shortDescription;
    if (description !== undefined) product.description = description;
    if (material !== undefined) product.material = material;
    if (scientificName !== undefined) product.scientificName = scientificName;
    if (origin !== undefined) product.origin = origin;
    if (color !== undefined) product.color = color;
    if (size !== undefined) product.size = size;
    if (moq !== undefined) product.moq = moq;
    if (capacity !== undefined) product.capacity = capacity;
    if (leadTime !== undefined) product.leadTime = leadTime;
    if (priceType !== undefined) product.priceType = priceType;
    if (usage !== undefined) product.usage = usage;
    if (buyerRequirement !== undefined)
      product.buyerRequirement = buyerRequirement;
    if (status !== undefined) product.status = status;
    if (order !== undefined) product.order = Number(order) || 0;

    if (isFeatured !== undefined) {
      product.isFeatured = isFeatured === "true" || isFeatured === true;
    }

    if (req.files && req.files.length > 0) {
      product.images.forEach((img) => {
        deleteLocalImage(img.public_id);
      });

      const uploadedImages = req.files.map((file) => makeImageObject(file));

      product.images = uploadedImages;
      product.thumbnail = uploadedImages[0] || { url: "", public_id: "" };
    }

    await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log("Product update error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.images.forEach((img) => {
      deleteLocalImage(img.public_id);
    });

    await product.deleteOne();

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Product delete error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
};
