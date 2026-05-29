import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import SEO from "../components/SEO";
import HeroSlider from "../components/HeroSlider";
import CategoryCard from "../components/CategoryCard";
import GalleryCard from "../components/GalleryCard";
import Loading from "../components/Loading";
import ProductFeatures from "../components/ProductFeatures";

const fallbackCategories = [
  {
    _id: "bamboo-furniture",
    name: "Bamboo Furniture",
    description:
      "Stool, table, chair, storage and functional bamboo furniture.",
  },
  {
    _id: "bamboo-home-decor",
    name: "Bamboo Home Decor",
    description: "Mirrors, lamps, wall decor and decorative bamboo pieces.",
  },
  {
    _id: "bamboo-kitchen-products",
    name: "Bamboo Kitchen Products",
    description:
      "Serving trays, glasses, kitchen accessories and dining products.",
  },
  {
    _id: "handmade-bamboo-crafts",
    name: "Handmade Bamboo Crafts",
    description:
      "Traditional handcrafted bamboo products made by skilled artisans.",
  },
  {
    _id: "eco-lifestyle-products",
    name: "Eco Lifestyle Products",
    description:
      "Sustainable lifestyle products for modern eco-conscious homes.",
  },
  {
    _id: "gift-items",
    name: "Gift Items",
    description: "Natural handmade bamboo gift and souvenir items.",
  },
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [sliders, setSliders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadHomeData = async () => {
      setLoading(true);

      const [sliderRes, categoryRes, galleryRes] = await Promise.allSettled([
        api.get("/sliders"),
        api.get("/categories"),
        api.get("/gallery"),
      ]);

      if (!isMounted) return;

      if (sliderRes.status === "fulfilled") {
        setSliders(sliderRes.value.data.sliders || []);
      } else {
        console.log(
          "Slider load error:",
          sliderRes.reason?.response?.data || sliderRes.reason?.message,
        );
        setSliders([]);
      }

      if (categoryRes.status === "fulfilled") {
        const apiCategories = categoryRes.value.data.categories || [];
        setCategories(
          apiCategories.length > 0 ? apiCategories : fallbackCategories,
        );
      } else {
        console.log(
          "Category load error:",
          categoryRes.reason?.response?.data || categoryRes.reason?.message,
        );
        setCategories(fallbackCategories);
      }

      if (galleryRes.status === "fulfilled") {
        setGallery((galleryRes.value.data.gallery || []).slice(0, 6));
      } else {
        console.log(
          "Gallery load error:",
          galleryRes.reason?.response?.data || galleryRes.reason?.message,
        );
        setGallery([]);
      }

      setLoading(false);
    };

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <Loading text="Preparing website..." />;

  const finalCategories =
    categories.length > 0 ? categories : fallbackCategories;

  return (
    <>
      <SEO />

      <HeroSlider slides={sliders} />

      <ProductFeatures />

      {/* Product Commitment */}
      <section className="commitment-section py-16 bg-green-50">
        <div className="container mx-auto px-4 md:flex md:items-center md:gap-8">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <span className="text-yellow-500 uppercase font-semibold text-sm block mb-2">
              Our Commitment
            </span>
            <h2 className="text-3xl font-bold mb-6">
              Empowering People, Preserving Heritage
            </h2>

            <ul className="mb-6 list-disc list-inside text-gray-700">
              <li>Empowering women artisans.</li>
              <li>Creating a sustainable future.</li>
              <li>Nurturing nature and livelihoods.</li>
              <li>Building communities through ethical production.</li>
              <li>Preserving our planet one handmade piece at a time.</li>
            </ul>

            <Link
              to="/sustainability"
              className="inline-block px-6 py-3 border border-green-700 text-green-700 font-semibold rounded hover:bg-green-700 hover:text-white transition"
            >
              Read Craft Story
            </Link>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/src/assets/commitment-image.png"
              alt="Commitment"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Our Products Navigation Section - হুবহু image_c7921e.jpg এর লেআউট */}
      {finalCategories.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Section Head */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                Our Products
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Browse our wide range of eco-friendly handicraft products are
                below:
              </p>
            </div>

            {/* Category Links - বাটনগুলোকে লিংকে কনভার্ট করা হয়েছে */}
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              {/* "ALL" লিঙ্ক - এটি সরাসরি সব প্রোডাক্ট পেজে নিয়ে যাবে */}
              <Link
                to="/products"
                className="px-5 py-2.5 rounded-md font-bold text-xs md:text-sm uppercase tracking-wider shadow-sm bg-[#F3D16E] hover:bg-[#dfb53d] text-black transition-all duration-300"
              >
                ALL
              </Link>

              {/* ডাইনামিক ক্যাটাগরি লিংকের লুপ */}
              {finalCategories.map((category) => (
                <Link
                  key={category._id}
                  to={`/products?category=${category._id}`} // ইউআরএল-এ ক্যাটাগরি আইডি পাস হচ্ছে
                  className="px-5 py-2.5 rounded-md font-bold text-xs md:text-sm uppercase tracking-wider shadow-sm bg-[#F3D16E] hover:bg-[#dfb53d] text-black transition-all duration-300"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
