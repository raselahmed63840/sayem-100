import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import api from "../api/axios";
import logo from "../assets/logo.png";

const fallbackCategories = [
  { _id: "bamboo-furniture", name: "Bamboo Furniture" },
  { _id: "bamboo-home-decor", name: "Bamboo Home Decor" },
  { _id: "bamboo-kitchen-products", name: "Bamboo Kitchen Products" },
  { _id: "handmade-bamboo-crafts", name: "Handmade Bamboo Crafts" },
  { _id: "eco-lifestyle-products", name: "Eco Lifestyle Products" },
  { _id: "gift-items", name: "Gift Items" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

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

  const finalCategories =
    categories.length > 0 ? categories : fallbackCategories;

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>Eco-Friendly Bamboo Craft Brand from Bangladesh</span>
          <span>contact@nurnobibamboocraft.com</span>
        </div>
      </div>

      <div className="container logo-row">
        <Link to="/" className="brand" onClick={closeMenu}>
          <img src={logo} alt="Nurnobi Bamboo Craft" />
          <div>
            <h1>Nurnobi Bamboo Craft</h1>
            <p>Manufacturer, Exporter, Wholesaler & Supplier</p>
          </div>
        </Link>

        <button className="menu-btn" onClick={() => setOpen((prev) => !prev)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      <nav className={`main-nav ${open ? "show" : ""}`}>
        <div className="container nav-inner">
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About Us
          </NavLink>

          <div className="nav-dropdown">
            <button type="button">Products ▾</button>
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
                  to={
                    cat._id.length === 24
                      ? `/products/category/${cat._id}`
                      : "/products"
                  }
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
      </nav>
    </header>
  );
};

export default Navbar;
