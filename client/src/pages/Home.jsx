import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";
import SEO from "../components/SEO";
import HeroSlider from "../components/HeroSlider";
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

const productDescriptions = [
  {
    title: "BAMBOO FURNITURE",
    text: "Bamboo chair, bamboo stool, coffee table, bedside table, bookshelf, wardrobe, outdoor chair and handmade bamboo seating items.",
  },
  {
    title: "BAMBOO HOME DECOR",
    text: "Bamboo wall mirror, bamboo lamp shade, wall art, shelves, baskets, room divider, flower stand and decorative craft items.",
  },
  {
    title: "BAMBOO KITCHEN PRODUCTS",
    text: "Cutting board, spoon, spatula, tray, bowl, chopsticks, storage container, serving glass and eco-friendly dining accessories.",
  },
  {
    title: "HANDMADE BAMBOO CRAFTS",
    text: "Handmade baskets, souvenir items, gift products, traditional bamboo crafts and artisan-made decorative products.",
  },
  {
    title: "ECO LIFESTYLE PRODUCTS",
    text: "Sustainable bamboo products for home, office, garden, workspace and everyday eco-conscious lifestyle use.",
  },
];

const makeSlug = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getCategoryValue = (category) =>
  category._id || category.slug || makeSlug(category.name);

const getList = (data, key) => {
  if (Array.isArray(data)) return data;
  return data?.[key] || data?.data || [];
};

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [sliders, setSliders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openingCategory, setOpeningCategory] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadHomeData = async () => {
      setLoading(true);

      const [sliderRes, categoryRes] = await Promise.allSettled([
        api.get("/sliders"),
        api.get("/categories"),
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
        const apiCategories = getList(categoryRes.value.data, "categories");
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

      setLoading(false);
    };

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  const finalCategories =
    categories.length > 0 ? categories : fallbackCategories;

  const openCategoryFirstProduct = async (category) => {
    const categoryValue = getCategoryValue(category);
    setOpeningCategory(categoryValue);

    try {
      const { data } = await api.get(
        `/products?category=${encodeURIComponent(categoryValue)}&limit=1`,
      );

      const productList = getList(data, "products");
      const firstProduct = productList[0];

      if (firstProduct?.slug) {
        navigate(`/products/${firstProduct.slug}`);
        return;
      }

      navigate("/products");
    } catch (error) {
      console.log(
        "Category product open error:",
        error.response?.data || error.message,
      );
      navigate("/products");
    } finally {
      setOpeningCategory("");
    }
  };

  if (loading) return <Loading text="Preparing website..." />;

  return (
    <>
      <SEO />

      <HeroSlider slides={sliders} />

      <ProductFeatures />

      {/* Product Commitment */}
      <section className="commitment-section py-16 bg-green-50">
        <div className="container mx-auto px-4 md:flex md:items-center md:gap-8">
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

          <div className="md:w-1/2 flex justify-center">
            <img
              src="/src/assets/commitment-image.png"
              alt="Commitment"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Our Products Navigation Section */}
      {finalCategories.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                Our Products
              </h2>

              <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Browse our wide range of eco-friendly handmade bamboo products
                below:
              </p>
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto mb-8">
              <Link
                to="/products"
                className="px-8 py-3 rounded-md font-extrabold text-xs md:text-sm uppercase tracking-wider shadow-sm bg-[#F3D16E] text-black transition-all duration-300 hover:bg-[#13723b] hover:text-white hover:-translate-y-1 hover:shadow-lg"
              >
                ALL
              </Link>

              {finalCategories.map((category) => {
                const categoryValue = getCategoryValue(category);
                const isOpening = openingCategory === categoryValue;

                return (
                  <button
                    key={categoryValue}
                    type="button"
                    disabled={Boolean(openingCategory)}
                    onClick={() => openCategoryFirstProduct(category)}
                    className="px-8 py-3 rounded-md font-extrabold text-xs md:text-sm uppercase tracking-wider shadow-sm bg-[#F3D16E] text-black transition-all duration-300 hover:bg-[#13723b] hover:text-white hover:-translate-y-1 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isOpening ? "Opening..." : category.name}
                  </button>
                );
              })}
            </div>

            {/* Product Description */}
            <div className="max-w-6xl mx-auto border-2 border-[#13723b]/15 bg-white rounded-md p-5 md:p-6 text-left shadow-sm">
              <ul className="space-y-3">
                {productDescriptions.map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-3 text-sm md:text-base leading-7 text-gray-800"
                  >
                    <span className="text-[#13723b] font-extrabold mt-0.5">
                      ✓
                    </span>

                    <span>
                      <strong className="font-extrabold text-gray-900">
                        {item.title}
                      </strong>
                      <span> : {item.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
