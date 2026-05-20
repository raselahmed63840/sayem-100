import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 40);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProductOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeAllMenus = () => {
    setOpen(false);
    setProductOpen(false);
  };

  const toggleMobileMenu = () => {
    setOpen((prev) => !prev);
  };

  const toggleProductMenu = () => {
    setProductOpen((prev) => !prev);
  };

  return (
    <header className="site-header">
      {/* Top strip */}
      <div className="top-strip">
        <div className="container top-strip-inner">
          <p>Manufacturer, Exporter, Wholesaler & Supplier</p>
          <a href="mailto:contact@nurnobibamboocraft.com">
            contact@nurnobibamboocraft.com
          </a>
        </div>
      </div>

      {/* Sticky nav only */}
      <nav className={`main-nav ${sticky ? "is-sticky" : ""}`}>
        <div className="container nav-inner">
          {/* Logo + Brand */}
          <Link to="/" className="nav-brand" onClick={closeAllMenus}>
            <img src={logo} alt="Nurnobi Bamboo Craft" className="brand-logo" />
            <div className="brand-text">
              <h1>Nurnobi Bamboo Craft</h1>
              <span>Eco-Friendly Bamboo Craft Brand from Bangladesh</span>
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            className="menu-btn"
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>

          {/* Nav links */}
          <div className={`nav-links ${open ? "show" : ""}`}>
            <NavLink to="/" onClick={closeAllMenus}>
              Home
            </NavLink>

            <NavLink to="/about" onClick={closeAllMenus}>
              About Us
            </NavLink>

            <div
              className={`nav-dropdown ${productOpen ? "open" : ""}`}
              ref={dropdownRef}
            >
              <button type="button" onClick={toggleProductMenu}>
                Products <span className="caret">▾</span>
              </button>

              <div className="dropdown-menu">
                <Link to="/products" onClick={closeAllMenus}>
                  All Products
                </Link>
                <Link
                  to="/products/category/bamboo-serving-tray"
                  onClick={closeAllMenus}
                >
                  Bamboo Serving Tray
                </Link>
                <Link
                  to="/products/category/bamboo-basket"
                  onClick={closeAllMenus}
                >
                  Bamboo Basket
                </Link>
                <Link
                  to="/products/category/home-decor"
                  onClick={closeAllMenus}
                >
                  Home Decor
                </Link>
              </div>
            </div>

            <NavLink to="/gallery" onClick={closeAllMenus}>
              Gallery
            </NavLink>

            <NavLink to="/sustainability" onClick={closeAllMenus}>
              Sustainability
            </NavLink>

            <NavLink to="/contact" onClick={closeAllMenus}>
              Contact
            </NavLink>
          </div>
        </div>
      </nav>

      {/* spacer for sticky nav */}
      {sticky && <div className="nav-spacer"></div>}
    </header>
  );
};

export default Navbar;
