import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import api from "../api/axios";
import logo from "../assets/logo.png";

const fallbackCategories = [
  {
    _id: "bamboo-furniture",
    name: "Bamboo Furniture",
    slug: "bamboo-furniture",
  },
  {
    _id: "bamboo-home-decor",
    name: "Bamboo Home Decor",
    slug: "bamboo-home-decor",
  },
  {
    _id: "bamboo-kitchen-products",
    name: "Bamboo Kitchen Products",
    slug: "bamboo-kitchen-products",
  },
  {
    _id: "handmade-bamboo-crafts",
    name: "Handmade Bamboo Crafts",
    slug: "handmade-bamboo-crafts",
  },
  {
    _id: "eco-lifestyle-products",
    name: "Eco Lifestyle Products",
    slug: "eco-lifestyle-products",
  },
  {
    _id: "gift-items",
    name: "Gift Items",
    slug: "gift-items",
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

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openingCategory, setOpeningCategory] = useState("");

  const navRef = useRef(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        const categoryList = getList(data, "categories");
        setCategories(categoryList);
      } catch (error) {
        console.log(
          "Navbar category error:",
          error.response?.data || error.message,
        );
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
        setProductOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const finalCategories =
    categories.length > 0 ? categories : fallbackCategories;

  const closeMenu = () => {
    setMenuOpen(false);
    setProductOpen(false);
  };

  const openCategoryFirstProduct = async (event, category) => {
    event.preventDefault();

    const categoryValue = getCategoryValue(category);

    closeMenu();
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

  return (
    <>
      <header className="site-header !fixed !top-0 !left-0 !right-0 !w-full z-[9999]">
        <nav className="main-nav" ref={navRef}>
          <div className="container nav-inner">
            <Link to="/" className="nav-brand" onClick={closeMenu}>
              <img
                src={logo}
                alt="Nurnobi Bamboo Craft"
                className="brand-logo"
              />

              <div className="brand-text">
                <h1>Nurnobi Bamboo Craft</h1>
                <span>Eco-Friendly Bamboo Craft Brand from Bangladesh</span>
              </div>
            </Link>

            <button
              type="button"
              className={`menu-btn ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Open menu"
            >
              {menuOpen ? "×" : "⋮"}
            </button>

            <div className={`nav-links ${menuOpen ? "show" : ""}`}>
              <NavLink to="/" onClick={closeMenu}>
                Home
              </NavLink>

              <NavLink to="/about" onClick={closeMenu}>
                About Us
              </NavLink>

              <div className={`nav-dropdown ${productOpen ? "open" : ""}`}>
                <button
                  type="button"
                  onClick={() => setProductOpen((prev) => !prev)}
                >
                  Products <span className="caret">▾</span>
                </button>

                <div className="dropdown-menu">
                  <Link to="/products" onClick={closeMenu}>
                    All Products
                  </Link>

                  {finalCategories.map((cat) => {
                    const categoryValue = getCategoryValue(cat);
                    const isOpening = openingCategory === categoryValue;

                    return (
                      <Link
                        key={categoryValue}
                        to={`/products/category/${categoryValue}`}
                        onClick={(event) =>
                          openCategoryFirstProduct(event, cat)
                        }
                      >
                        {isOpening ? "Opening..." : cat.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <NavLink to="/gallery" onClick={closeMenu}>
                Gallery
              </NavLink>

              <NavLink to="/sustainability" onClick={closeMenu}>
                Sustainability
              </NavLink>

              <NavLink to="/clients" onClick={closeMenu}>
                Clients
              </NavLink>

              <NavLink to="/contact" onClick={closeMenu}>
                Contact
              </NavLink>
            </div>
          </div>
        </nav>
      </header>

      <div
        className="h-[72px] md:h-[76px] lg:h-[78px] -mb-px"
        aria-hidden="true"
      />
    </>
  );
};

export default Navbar;
