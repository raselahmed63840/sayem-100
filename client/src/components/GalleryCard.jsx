import { getImageUrl, optimizeCloudinaryImage } from "../utils/imageHelper";

const GalleryCard = ({ item }) => {
  return (
    <figure className="gallery-card">
      <img
        src={optimizeCloudinaryImage(getImageUrl(item.image), 800)}
        alt={item.title}
        loading="lazy"
      />

      <figcaption>
        <span>{item.type || "Gallery"}</span>
        <h3>{item.title}</h3>
      </figcaption>
    </figure>
  );
};

export default GalleryCard;
