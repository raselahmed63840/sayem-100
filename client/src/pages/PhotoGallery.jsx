import { useEffect, useState } from "react";
import api from "../api/axios";
import SEO from "../components/SEO";
import GalleryCard from "../components/GalleryCard";
import Loading from "../components/Loading";

const PhotoGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const { data } = await api.get("/gallery");
        setGallery(data.gallery || []);
      } catch {
        setGallery([]);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  return (
    <section className="page-section">
      <SEO
        title="Gallery | Nurnobi Bamboo Craft"
        description="View bamboo products, handmade craft, artisan work and gallery photos of Nurnobi Bamboo Craft."
      />

      <div className="container">
        <div className="page-title">
          <span className="section-kicker">Gallery</span>
          <h1>Products, Craftsmanship and Artisan Work</h1>
          <p>
            Explore our bamboo products, handmade craft process, artisan work
            and eco-friendly collection.
          </p>
        </div>

        {loading ? (
          <Loading text="Loading gallery..." />
        ) : gallery.length > 0 ? (
          <div className="gallery-grid">
            {gallery.map((item) => (
              <GalleryCard item={item} key={item._id} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No gallery images found</h2>
            <p>Upload gallery photos from admin panel.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;
