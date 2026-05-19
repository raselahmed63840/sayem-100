import { Link } from "react-router-dom";
import { getImageUrl, optimizeCloudinaryImage } from "../utils/imageHelper";

const ProductCard = ({ product }) => {
  const image = product.thumbnail || product.images?.[0];

  return (
    <article className="product-card">
      <Link to={`/products/${product.slug}`} className="product-img">
        <img
          src={optimizeCloudinaryImage(getImageUrl(image), 600)}
          alt={product.title}
          loading="lazy"
        />
      </Link>

      <div className="product-info">
        <span>{product.category?.name || "Bamboo Craft"}</span>

        <h3>
          <Link to={`/products/${product.slug}`}>{product.title}</Link>
        </h3>

        <p>
          {product.shortDescription ||
            "Eco-friendly handmade bamboo product from Bangladesh."}
        </p>

        <Link to={`/products/${product.slug}`} className="text-btn">
          View Details →
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
