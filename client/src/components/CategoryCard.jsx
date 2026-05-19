import { Link } from "react-router-dom";
import getImageUrl from "../utils/imageHelper";

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/products/category/${category._id}`} className="category-card">
      <div className="category-image">
        <img src={getImageUrl(category.image)} alt={category.name} />
      </div>

      <div className="category-content">
        <h3>{category.name}</h3>
        <p>{category.description}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
