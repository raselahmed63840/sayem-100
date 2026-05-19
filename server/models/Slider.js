const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
  },
  { _id: false },
);

const sliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      default: "",
    },

    image: imageSchema,

    buttonText: {
      type: String,
      default: "Explore Products",
    },

    buttonLink: {
      type: String,
      default: "/products",
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

module.exports = mongoose.model("Slider", sliderSchema);
