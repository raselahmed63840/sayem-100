import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import SEO from "../components/SEO";
import HeroSlider from "../components/HeroSlider";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
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
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadHomeData = async () => {
      setLoading(true);

      const [sliderRes, categoryRes, productRes, galleryRes] =
        await Promise.allSettled([
          api.get("/sliders"),
          api.get("/categories"),
          api.get("/products?featured=true&limit=6"),
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

      if (productRes.status === "fulfilled") {
        setProducts(productRes.value.data.products || []);
      } else {
        console.log(
          "Product load error:",
          productRes.reason?.response?.data || productRes.reason?.message,
        );
        setProducts([]);
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

      <section className="intro-section">
        <div className="container intro-grid">
          <div>
            <span className="section-kicker">Nurnobi Bamboo Craft</span>

            <h2>All Kinds of Handmade Bamboo Products</h2>

            <p>
              Founded in 2002, Nurnobi Bamboo Craft is a Bangladesh-based
              eco-friendly handicrafts manufacturing and exporting company. We
              transform bamboo and natural materials into elegant home décor,
              fashion accessories, kitchen products, storage solutions and
              decorative art pieces.
            </p>

            <div className="hero-stats">
              <div>
                <strong>250+</strong>
                <span>Artisans Supported</span>
              </div>

              <div>
                <strong>1000+</strong>
                <span>Families Impacted</span>
              </div>

              <div>
                <strong>2002</strong>
                <span>Founded</span>
              </div>
            </div>

            <Link to="/about" className="primary-btn">
              Learn More
            </Link>
          </div>

          <div className="trust-grid">
            <div>
              <h3>Eco Friendly</h3>
              <p>Bamboo-based sustainable handmade products.</p>
            </div>

            <div>
              <h3>Women-Led Craft</h3>
              <p>Empowering skilled women and men artisans.</p>
            </div>

            <div>
              <h3>Export Ready</h3>
              <p>Manufacturer, exporter, wholesaler and supplier.</p>
            </div>

            <div>
              <h3>Ethical Production</h3>
              <p>Community-focused and socially responsible production.</p>
            </div>
          </div>
        </div>
      </section>

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
              src="/src/assets/commitment-image.png" // replace with uploaded image path
              alt="Commitment"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Product Showcase */}

      <section className="products-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-kicker">Product Categories</span>
              <h2>Bamboo Product Showcase</h2>
            </div>

            <Link to="/products" className="text-btn">
              View All Products →
            </Link>
          </div>

          <div className="category-grid">
            {finalCategories.slice(0, 6).map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {products.length > 0 && (
        <section className="products-section light-bg">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="section-kicker">Featured Products</span>
                <h2>Handmade Bamboo Collection</h2>
              </div>

              <Link to="/products" className="text-btn">
                Explore More →
              </Link>
            </div>

            <div className="product-grid">
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
