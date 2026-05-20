import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import SEO from "../components/SEO";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

const ProductGallery = () => {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryCategory = searchParams.get("category") || "";
  const initialCategory = categoryId || queryCategory || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveCategory(categoryId || queryCategory || "");
  }, [categoryId, queryCategory]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        const categoryList = Array.isArray(data)
          ? data
          : data.categories || data.data || [];
        setCategories(categoryList);
      } catch {
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();
        params.set("limit", "50");

        if (activeCategory) params.set("category", activeCategory);
        if (search.trim()) params.set("search", search.trim());

        const { data } = await api.get(`/products?${params.toString()}`);
        setProducts(data.products || data.data || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [activeCategory, search]);

  const handleCategoryChange = (value) => {
    setActiveCategory(value);

    if (value) {
      setSearchParams({ category: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <SEO
        title="Bamboo Products | Nurnobi Bamboo Craft"
        description="Explore eco-friendly handmade bamboo products from Bangladesh."
      />

      <section className="page-hero">
        <div className="container">
          <p>Products</p>
          <h1>Eco-Friendly Handmade Bamboo Products</h1>
          <span>
            Explore bamboo furniture, home décor, kitchen products, storage
            solutions, handicrafts, souvenirs and gift items.
          </span>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="product-filter-row">
            <input
              type="text"
              placeholder="Search bamboo products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={activeCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id || cat.slug} value={cat._id || cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <Loading />
          ) : products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No products found</h2>
              <p>Add bamboo products from admin panel.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductGallery;
