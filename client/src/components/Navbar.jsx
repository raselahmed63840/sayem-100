import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
  { _id: "gift-items", name: "Gift Items", slug: "gift-items" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isSticky, setIsSticky] = useState(false);

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
    const handleScroll = () => {
      setIsSticky(window.scrollY > 42);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const finalCategories =
    categories.length > 0 ? categories : fallbackCategories;

  const closeMenu = () => {
    setOpen(false);
    setProductOpen(false);
  };

  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="container top-strip-inner">
          <p>Manufacturer, Exporter, Wholesaler & Supplier</p>
          <a href="mailto:contact@nurnobibamboocraft.com">
            contact@nurnobibamboocraft.com
          </a>
        </div>
      </div>

      <nav className={`main-nav ${isSticky ? "is-sticky" : ""}`}>
        <div className="container nav-inner">
          <Link to="/" className="nav-brand" onClick={closeMenu}>
            <img src={logo} alt="Nurnobi Bamboo Craft" />
            <div>
              <h1>Nurnobi Bamboo Craft</h1>
              <span>Eco-Friendly Bamboo Craft Brand from Bangladesh</span>
            </div>
          </Link>

          <button
            className="menu-btn"
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>

          <div className={`nav-links ${open ? "show" : ""}`}>
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
                Products ▾
              </button>

              <div className="dropdown-menu wide-menu">
                <Link to="/product-description" onClick={closeMenu}>
                  Raw Material & Product Description
                </Link>

                <Link to="/products" onClick={closeMenu}>
                  All Products
                </Link>

                {finalCategories.map((cat) => (
                  <Link
                    key={cat._id}
                    to={`/products?category=${cat.slug || cat._id}`}
                    onClick={closeMenu}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <NavLink to="/gallery" onClick={closeMenu}>
              Gallery
            </NavLink>

            <NavLink to="/sustainability" onClick={closeMenu}>
              Sustainability
            </NavLink>

            <NavLink to="/contact" onClick={closeMenu}>
              Contact
            </NavLink>
          </div>
        </div>
      </nav>

      {isSticky && <div className="nav-spacer" />}
    </header>
  );
};

export default Navbar;
