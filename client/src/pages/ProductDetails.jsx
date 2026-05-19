import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../api/axios";
import SEO from "../components/SEO";
import Loading from "../components/Loading";
import InquiryForm from "../components/InquiryForm";
import { getImageUrl, optimizeCloudinaryImage } from "../utils/imageHelper";

const ProductDetails = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await api.get(`/products/slug/${slug}`);
        setProduct(data.product);
        setActiveImage(data.product?.thumbnail || data.product?.images?.[0]);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  if (loading) return <Loading text="Loading product..." />;

  if (!product) {
    return (
      <section className="page-section">
        <div className="container empty-state">
          <h1>Product not found</h1>
          <Link to="/products" className="primary-btn">
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  const whatsappNumber =
    import.meta.env.VITE_WHATSAPP_NUMBER || "8801863840408";

  const inquiryText = encodeURIComponent(
    `Hello Nurnobi Bamboo Craft, I want to know more about ${product.title}.`,
  );

  return (
    <section className="page-section">
      <SEO
        title={`${product.title} | Nurnobi Bamboo Craft`}
        description={
          product.shortDescription ||
          "Eco-friendly handmade bamboo product from Bangladesh."
        }
      />

      <div className="container product-details">
        <div>
          <div className="details-main-img">
            <img
              src={optimizeCloudinaryImage(getImageUrl(activeImage), 900)}
              alt={product.title}
            />
          </div>

          {product.images?.length > 1 && (
            <div className="thumb-row">
              {product.images.map((img, index) => (
                <button key={index} onClick={() => setActiveImage(img)}>
                  <img
                    src={optimizeCloudinaryImage(getImageUrl(img), 180)}
                    alt={product.title}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="details-content">
          <span className="section-kicker">
            {product.category?.name || "Bamboo Product"}
          </span>

          <h1>{product.title}</h1>

          <p>
            {product.shortDescription ||
              "Eco-friendly handmade bamboo product from Bangladesh."}
          </p>

          <div className="spec-box">
            <p>
              <strong>Material:</strong> {product.material || "Bamboo"}
            </p>
            <p>
              <strong>Scientific Name:</strong>{" "}
              {product.scientificName || "Bambusa Vulgaris"}
            </p>
            <p>
              <strong>Origin:</strong> {product.origin || "Bangladesh"}
            </p>
            <p>
              <strong>Color:</strong> {product.color || "Natural / Any Color"}
            </p>
            <p>
              <strong>Size:</strong>{" "}
              {product.size || "As per buyer requirements"}
            </p>
            <p>
              <strong>MOQ:</strong> {product.moq || "500-3000 pcs"}
            </p>
            <p>
              <strong>Capacity:</strong>{" "}
              {product.capacity || "20000 pcs / 90 days handmade"}
            </p>
            <p>
              <strong>Lead Time:</strong> {product.leadTime || "60-90 days"}
            </p>
            <p>
              <strong>Price:</strong> {product.priceType || "FOB"}
            </p>
          </div>

          <div className="details-desc">
            <h3>Description</h3>
            <p>
              {product.description ||
                "This product is carefully crafted by skilled artisans using sustainable bamboo and traditional craftsmanship."}
            </p>
          </div>

          <div className="details-actions">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${inquiryText}`}
              target="_blank"
              rel="noreferrer"
              className="primary-btn"
            >
              WhatsApp Inquiry
            </a>

            <Link to="/contact" className="outline-btn">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="container inquiry-wrap">
        <div className="section-head">
          <div>
            <span className="section-kicker">Request Quotation</span>
            <h2>Send Product Inquiry</h2>
          </div>
        </div>

        <InquiryForm productName={product.title} />
      </div>
    </section>
  );
};

export default ProductDetails;
