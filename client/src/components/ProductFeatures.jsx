// src/components/ProductFeatures.jsx
import React from "react";
import qualityProduct from "../assets/quality-product.png";
import compliance from "../assets/compliance.png";
import onTime from "../assets/ontime.png";
import certifi from "../assets/certifi.png";
import ecoFriendly from "../assets/eco-friendly.png";
import organic from "../assets/organic.png";
import natural from "../assets/natural.png";
import biodegradable from "../assets/biodegradable.png";

const mainFeatures = [
  { img: qualityProduct, title: "QUALITY PRODUCTS" },
  { img: compliance, title: "100% COMPLIANCE" },
  { img: onTime, title: "ONTIME DELIVERY" },
  { img: certifi, title: "CERTIFICATION" },
];

const productAttributes = [
  {
    img: ecoFriendly,
    title: "Eco-Friendly",
    desc: "Bamboo-based sustainable handmade products.",
  },
  {
    img: organic,
    title: "Women-Led Craft",
    desc: "Empowering skilled women and men artisans.",
  },
  {
    img: natural,
    title: "Export Ready",
    desc: "Manufacturer, exporter, wholesaler and supplier.",
  },
  {
    img: biodegradable,
    title: "Ethical Production",
    desc: "Community-focused and socially responsible production.",
  },
];

const ProductFeatures = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
          All Kinds of Handmade Bamboo Products
        </h2>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-sm sm:text-base">
          Founded in 2002, Nurnobi Bamboo Craft is a Bangladesh-based
          eco-friendly handicrafts manufacturing and exporting company. We
          transform bamboo and natural materials into elegant home décor,
          fashion accessories, kitchen products, storage solutions, and
          decorative art pieces.
        </p>

        {/* Main Features (Logo row stays same as old design) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {mainFeatures.map((feature, i) => (
            <div key={i} className="flex flex-col items-center px-4">
              <img
                src={feature.img}
                alt={feature.title}
                className="w-16 h-16 mb-2"
              />
              <span className="font-semibold text-gray-800">
                {feature.title}
              </span>
            </div>
          ))}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-8">
          Our Products are
        </h3>

        {/* Product Attributes (Logo old design, but description updated from screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {productAttributes.map((attr, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center px-4"
            >
              <img src={attr.img} alt={attr.title} className="w-20 h-20 mb-4" />
              <h4 className="font-semibold text-lg mb-2 text-green-800">
                {attr.title}
              </h4>
              <p className="text-gray-600 text-sm">{attr.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
