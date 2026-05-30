import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import api from "../api/axios";
import SEO from "../components/SEO";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

const isObjectId = (value = "") => /^[a-f\d]{24}$/i.test(value);

const makeSlug = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getList = (data, key) => {
  if (Array.isArray(data)) return data;
  return data?.[key] || data?.data || [];
};

const ProductGallery = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const queryCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    categoryId || queryCategory || "",
  );
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setActiveCategory(categoryId || queryCategory || "");
  }, [categoryId, queryCategory]);

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        const categoryList = getList(data, "categories");

        if (isMounted) {
          setCategories(categoryList);
        }
      } catch (error) {
        console.log(
          "Category load error:",
          error.response?.data || error.message,
        );

        if (isMounted) {
          setCategories([]);
        }
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const resolveCategoryId = async (value) => {
      if (!value) return "";

      if (isObjectId(value)) {
        return value;
      }

      let categoryList = categories;

      if (categoryList.length === 0) {
        try {
          const { data } = await api.get("/categories");
          categoryList = getList(data, "categories");

          if (isMounted) {
            setCategories(categoryList);
          }
        } catch (error) {
          console.log(
            "Category resolve error:",
            error.response?.data || error.message,
          );
        }
      }

      const matchedCategory = categoryList.find((cat) => {
        const catId = cat._id || "";
        const catSlug = cat.slug || "";
        const catNameSlug = makeSlug(cat.name || "");

        return catId === value || catSlug === value || catNameSlug === value;
      });

      return matchedCategory?._id || value;
    };

    const loadProducts = async () => {
      setLoading(true);
      setMessage("");

      try {
        const shouldOpenDirectProduct =
          Boolean(categoryId || queryCategory) &&
          Boolean(activeCategory) &&
          !search.trim();

        const categoryValue = await resolveCategoryId(activeCategory);

        const params = new URLSearchParams();

        if (shouldOpenDirectProduct) {
          params.set("limit", "1");
        } else {
          params.set("limit", "50");
        }

        if (categoryValue) {
          params.set("category", categoryValue);
        }

        if (search.trim()) {
          params.set("search", search.trim());
        }

        const { data } = await api.get(`/products?${params.toString()}`);
        const productList = getList(data, "products");

        if (!isMounted) return;

        if (shouldOpenDirectProduct) {
          const firstProduct = productList[0];

          if (firstProduct?.slug) {
            navigate(`/products/${firstProduct.slug}`, { replace: true });
            return;
          }

          setProducts([]);
          setMessage(
            "এই category তে কোনো product পাওয়া যায়নি। Admin panel থেকে product add করুন।",
          );
          return;
        }

        setProducts(productList);
      } catch (error) {
        console.log(
          "Product load error:",
          error.response?.data || error.message,
        );

        if (isMounted) {
          setProducts([]);
          setMessage("Product load failed. Backend/API connection check করুন।");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [activeCategory, search, categoryId, queryCategory, categories, navigate]);

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

      <section className="page-hero products-page-hero">
        <div className="container">
          <span className="section-kicker">Products</span>
          <h1>Eco-Friendly Handmade Bamboo Products</h1>
          <p>
            Explore bamboo furniture, home décor, kitchen products, storage
            solutions, handicrafts, souvenirs and gift items.
          </p>
        </div>
      </section>

      <section className="page-section product-list-section">
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
            <Loading text="Loading products..." />
          ) : products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>{message || "No products found"}</h2>
              <p>Add bamboo products from admin panel.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductGallery;
