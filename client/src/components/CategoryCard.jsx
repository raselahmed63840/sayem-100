import { Link } from "react-router-dom";
import { getImageUrl, optimizeCloudinaryImage } from "../utils/imageHelper";

const CategoryCard = ({ category }) => {
  const path =
    category._id && category._id.length === 24
      ? `/products/category/${category._id}`
      : "/products";

  return (
    <Link to={path} className="category-card">
      <div className="category-img">
        <img
          src={optimizeCloudinaryImage(getImageUrl(category.image), 600)}
          alt={category.name}
          loading="lazy"
        />
      </div>

      <div className="category-body">
        <h3>{category.name}</h3>
        <p>
          {category.description ||
            "Premium eco-friendly bamboo handmade products."}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
