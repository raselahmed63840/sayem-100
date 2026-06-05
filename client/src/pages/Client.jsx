// src/pages/Client.jsx

import React from "react";
import SEO from "../components/SEO";

const clientsData = [
  {
    name: "EUROPE",
    items: [
      "Germany",
      "Netherlands",
      "Denmark",
      "France",
      "Italy",
      "Poland",
      "Norway",
      "United Kingdom",
    ],
  },
  {
    name: "NORTH AMERICA",
    items: ["United States of America (USA)", "Canada"],
  },
  {
    name: "ASIA",
    items: [
      "Turkey",
      "Japan",
      "Saudi Arabia",
      "United Arab Emirates",
      "Qatar",
      "Kuwait",
      "Oman",
    ],
  },
  {
    name: "SOUTH AMERICA",
    items: ["Brazil", "Argentina"],
  },
];

const ClientPage = () => {
  return (
    <section className="page-section">
      <SEO
        title="Clients | Nurnobi Bamboo Craft"
        description="Our international clients across Europe, North America, Asia, and South America."
      />

      <div className="container my-16">
        <h2 className="text-3xl md:text-4xl font-black text-center text-black mb-3">
          Clients list in the world
        </h2>

        <p className="text-center text-gray-600 mb-10 text-base md:text-lg">
          Regional markets we currently serve
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientsData.map((region, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-7 shadow-sm hover:shadow-lg transition duration-300"
            >
              <div className="mb-6 text-center">
                <h3 className="text-xl font-black text-black uppercase tracking-wide">
                  {region.name}
                </h3>

                <div className="mx-auto mt-3 h-[3px] w-12 rounded-full bg-[#d4a633]"></div>
              </div>

              <ul className="list-disc pl-6 space-y-3 text-gray-800 text-base md:text-lg leading-relaxed">
                {region.items.map((country, idx) => (
                  <li key={idx}>{country}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientPage;
