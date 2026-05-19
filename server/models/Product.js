const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    productType: {
      type: String,
      default: "",
    },

    shortDescription: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    material: {
      type: String,
      default: "Bamboo",
    },

    scientificName: {
      type: String,
      default: "Bambusa Vulgaris",
    },

    origin: {
      type: String,
      default: "Bangladesh",
    },

    color: {
      type: String,
      default: "Natural / Any Color",
    },

    size: {
      type: String,
      default: "As per buyer requirements",
    },

    moq: {
      type: String,
      default: "500-3000 pcs",
    },

    capacity: {
      type: String,
      default: "20000 pcs / 90 days handmade",
    },

    leadTime: {
      type: String,
      default: "60-90 days",
    },

    priceType: {
      type: String,
      default: "FOB",
    },

    usage: {
      type: String,
      default: "",
    },

    buyerRequirement: {
      type: String,
      default: "Customization available as per buyer requirements.",
    },

    images: [
      {
        url: String,
        public_id: String,
      },
    ],

    thumbnail: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
