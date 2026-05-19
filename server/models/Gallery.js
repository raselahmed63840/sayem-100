const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
  },
  { _id: false },
);

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    image: imageSchema,

    type: {
      type: String,
      enum: ["product", "factory", "artisan", "certificate", "other"],
      default: "product",
    },

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Gallery", gallerySchema);
