const mongoose = require("mongoose");

const companyInfoSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "NurnobibambooCraft",
    },

    tagline: {
      type: String,
      default: "Manufacturer, Exporter, Wholesaler & Supplier",
    },

    aboutTitle: {
      type: String,
      default: "All kinds of Handmade Products",
    },

    aboutDescription: {
      type: String,
      default: "",
    },

    companyProfile: {
      type: String,
      default: "",
    },

    messageTopTeam: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    facebook: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    features: {
      type: [String],
      default: [
        "Quality Products",
        "100% Compliance",
        "Ontime Delivery",
        "Certification",
      ],
    },

    productValues: {
      type: [String],
      default: ["Eco-Friendly", "Organic", "Natural", "Biodegradable"],
    },

    commitments: {
      type: [String],
      default: [
        "Empowering women artisans",
        "A sustainable future",
        "Nurturing nature and livelihoods",
        "Building communities",
      ],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("CompanyInfo", companyInfoSchema);
