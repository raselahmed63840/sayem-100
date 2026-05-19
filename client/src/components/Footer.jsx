import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h2>Nurnobi Bamboo Craft</h2>
          <p>
            All Kinds of Handmade Bamboo Products — Manufacturer, Exporter,
            Wholesaler & Supplier. Founded in 2002 in Bangladesh.
          </p>
        </div>

        <div>
          <h3>Company</h3>
          <Link to="/about">About Us</Link>
          <Link to="/sustainability">Sustainability</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h3>Products</h3>
          <Link to="/product-description">Product Description</Link>
          <Link to="/products">Products</Link>
          <Link to="/products">Bamboo Furniture</Link>
          <Link to="/products">Bamboo Home Decor</Link>
        </div>

        <div>
          <h3>Contact</h3>
          <p>Email: contact@nurnobibamboocraft.com</p>
          <p>Phone: +880 1863-840408</p>
          <p>Origin: Bangladesh</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Nurnobi Bamboo Craft. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
