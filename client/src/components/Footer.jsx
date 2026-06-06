import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="w-full bg-[#13723b] text-white pt-8 pb-14 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1.6fr] gap-8 lg:gap-10 pb-7">
          {/* Brand */}
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold mb-4 leading-tight">
              Nurnobi Bamboo Craft
            </h2>

            <p className="text-sm md:text-base leading-7 text-white">
              All Kinds of Handmade Bamboo Products — Manufacturer, Exporter,
              Wholesaler & Supplier. Founded in 2002 in Bangladesh.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">Company</h3>

            <div className="flex flex-col gap-3 text-sm md:text-base">
              <Link to="/about" className="hover:text-yellow-200 transition">
                About Us
              </Link>

              <Link
                to="/sustainability"
                className="hover:text-yellow-200 transition"
              >
                Sustainability
              </Link>

              <Link to="/gallery" className="hover:text-yellow-200 transition">
                Gallery
              </Link>

              <Link to="/contact" className="hover:text-yellow-200 transition">
                Contact
              </Link>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">Products</h3>

            <div className="flex flex-col gap-3 text-sm md:text-base">
              <Link to="/products" className="hover:text-yellow-200 transition">
                Product Description
              </Link>

              <Link to="/products" className="hover:text-yellow-200 transition">
                Products
              </Link>

              <Link to="/products" className="hover:text-yellow-200 transition">
                Bamboo Furniture
              </Link>

              <Link to="/products" className="hover:text-yellow-200 transition">
                Bamboo Home Decor
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="min-w-0">
            <h3 className="text-lg md:text-xl font-bold mb-4">Contact</h3>

            <div className="flex flex-col gap-4 text-sm md:text-base">
              <a
                href="mailto:nurunnabi@nurnobibamboocraft.com"
                className="flex items-center gap-3 hover:text-yellow-200 transition min-w-0"
              >
                <EnvelopeIcon className="w-5 h-5 flex-shrink-0" />
                <span className="whitespace-nowrap text-[13px] sm:text-sm md:text-base">
                  nurunnabi@nurnobibamboocraft.com
                </span>
              </a>

              <a
                href="tel:+8801719632705"
                className="flex items-center gap-3 hover:text-yellow-200 transition"
              >
                <PhoneIcon className="w-5 h-5 flex-shrink-0" />
                <span className="whitespace-nowrap">+880 1719-632705</span>
              </a>

              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 mt-1 flex-shrink-0" />
                <span className="leading-7">
                  Borni, Delduar, Tangail, Dhaka, Bangladesh
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        {/* Copyright */}
        <div className="border-t border-white/20 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs md:text-sm italic">
            <p>© 2026 Nurnobi Bamboo Craft. All rights reserved.</p>

            <a
              href="https://wa.me/8801863840408"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-200 transition"
            >
              Developed by Rasel Ahmed
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
