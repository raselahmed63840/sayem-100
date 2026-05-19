import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/axios";
import SEO from "../components/SEO";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

const ProductGallery = () => {
  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(categoryId || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveCategory(categoryId || "");
  }, [categoryId]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        setCategories(data.categories || []);
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
        setProducts(data.products || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [activeCategory, search]);

  return (
    <section className="page-section">
      <SEO
        title="Bamboo Products | Nurnobi Bamboo Craft"
        description="Browse eco-friendly handmade bamboo products including furniture, home decor, kitchen products, crafts and gift items."
      />

      <div className="container">
        <div className="page-title">
          <span className="section-kicker">Products</span>
          <h1>Eco-Friendly Handmade Bamboo Products</h1>
          <p>
            Explore bamboo furniture, home décor, kitchen products, storage
            solutions, handicrafts, souvenirs and gift items.
          </p>
        </div>

        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search bamboo products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            <option value="">All Categories</option>

            {categories.map((cat) => (
              <option value={cat._id} key={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <Loading text="Loading products..." />
        ) : products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
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
  );
};

export default ProductGallery;
