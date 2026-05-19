const Category = require("../models/Category");
const Product = require("../models/Product");

const makeSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });

    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAdminCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({
      order: 1,
      createdAt: -1,
    });

    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, slug, description, order, isActive } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const finalSlug = slug ? makeSlug(slug) : makeSlug(name);

    const exists = await Category.findOne({ slug: finalSlug });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    let image = {
      url: "",
      public_id: "",
    };

    if (req.file) {
      image = {
        url: `/uploads/${req.file.filename}`,
        public_id: req.file.filename,
      };
    }

    const category = await Category.create({
      name,
      slug: finalSlug,
      description: description || "",
      order: Number(order) || 0,
      isActive: isActive === "false" ? false : true,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const { name, slug, description, order, isActive } = req.body;

    category.name = name || category.name;
    category.slug = slug ? makeSlug(slug) : category.slug;
    category.description = description ?? category.description;
    category.order = order !== undefined ? Number(order) : category.order;
    category.isActive = isActive === "false" ? false : true;

    if (req.file) {
      category.image = {
        url: `/uploads/${req.file.filename}`,
        public_id: req.file.filename,
      };
    }

    await category.save();

    res.json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const productCount = await Product.countDocuments({
      category: category._id,
    });

    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: "This category has products. Delete products first.",
      });
    }

    await category.deleteOne();

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCategories,
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
