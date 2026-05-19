import { Link } from "react-router-dom";
import getImageUrl from "../utils/imageHelper";

const ProductCard = ({ product }) => {
  const image = product.thumbnail || product.images?.[0];

  return (
    <Link to={`/products/${product.slug}`} className="product-card">
      <div className="product-image">
        <img
          src={getImageUrl(image)}
          alt={product.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/logo.png";
          }}
        />
      </div>

      <div className="product-info">
        <p className="product-category">
          {product.productType || product.category?.name || "Bamboo Product"}
        </p>

        <h3 className="product-title">{product.title}</h3>

        <p className="product-short">
          {product.shortDescription ||
            product.description ||
            "Eco-friendly handmade bamboo product crafted with natural materials."}
        </p>

        <span className="product-view-btn">View Details</span>
      </div>
    </Link>
  );
};

export default ProductCard;
