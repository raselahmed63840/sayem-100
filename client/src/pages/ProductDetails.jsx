import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../api/axios";
import getImageUrl from "../utils/imageHelper";
import Loading from "../components/Loading";

const STATIC_SIDE_IMAGE = "/details-static.jpg";

const getImageKey = (image) => {
  if (!image) return "";

  if (typeof image === "string") {
    return image;
  }

  return image.url || image.public_id || "";
};

const ProductDetails = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const mainProductImage = useMemo(() => {
    if (!product) return null;

    if (product.thumbnail?.url) {
      return product.thumbnail;
    }

    if (Array.isArray(product.images) && product.images[0]?.url) {
      return product.images[0];
    }

    return null;
  }, [product]);

  const galleryImages = useMemo(() => {
    if (!product) return [];

    const images = [];
    const mainImageKey = getImageKey(mainProductImage);

    if (Array.isArray(product.images)) {
      product.images.forEach((img) => {
        const imgKey = getImageKey(img);

        if (!img?.url) return;
        if (imgKey === mainImageKey) return;

        const alreadyAdded = images.some(
          (item) => getImageKey(item) === imgKey,
        );

        if (!alreadyAdded) {
          images.push(img);
        }
      });
    }

    return images;
  }, [product, mainProductImage]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await api.get(`/products/${slug}`);
        const foundProduct = data.product;

        if (!foundProduct) {
          setError("Product not found.");
          return;
        }

        setProduct(foundProduct);

        if (foundProduct.category?._id) {
          const relatedRes = await api.get(
            `/products?category=${foundProduct.category._id}&limit=8`,
          );

          const filtered = (relatedRes.data.products || []).filter(
            (item) => item._id !== foundProduct._id,
          );

          setRelatedProducts(filtered);
        }
      } catch (err) {
        console.log(
          "Product details error:",
          err.response?.data || err.message,
        );

        setError("Product details load failed.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  if (loading) return <Loading />;

  if (error || !product) {
    return (
      <main className="product-details-page">
        <div className="container">
          <div className="details-error-box">
            <h2>{error || "Product not found."}</h2>
            <Link to="/products">Back to Products</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="product-details-page">
      <section
        className="product-details-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.55), rgba(0,0,0,0.1)), url(${getImageUrl(
            mainProductImage || STATIC_SIDE_IMAGE,
          )})`,
        }}
      >
        <div className="container">
          <h1>{product.productType || product.category?.name || "Bamboo"}</h1>
        </div>
      </section>

      <section className="raw-section">
        <div className="container">
          <div className="section-title">
            <h2>Raw Material and Product Description</h2>
            <p>
              Browse our natural bamboo collection made from eco-friendly
              materials.
            </p>
          </div>

          <div className="details-info-grid">
            <div className="details-text">
              <h3>Product Details : </h3>

              <p>
                <strong>{product.title}:</strong>{" "}
                {product.description ||
                  product.shortDescription ||
                  "This product is made from natural bamboo and crafted for home, cafe, restaurant and export use."}
              </p>

              <ul className="product-spec-list">
                <li>
                  <strong>Scientific name:</strong>{" "}
                  {product.scientificName || "Bambusa Vulgaris"}
                </li>

                <li>
                  <strong>Care instructions:</strong>{" "}
                  {product.buyerRequirement ||
                    "Hand wash only. Keep dry after use."}
                </li>

                <li>
                  <strong>Origin:</strong> {product.origin || "Bangladesh"}
                </li>

                <li>
                  <strong>Color:</strong>{" "}
                  {product.color || "Natural / Any color"}
                </li>

                <li>
                  <strong>Size:</strong>{" "}
                  {product.size || "As per buyer requirements"}
                </li>

                <li>
                  <strong>MOQ:</strong> {product.moq || "500-3000 pcs"}
                </li>

                <li>
                  <strong>Capacity:</strong>{" "}
                  {product.capacity || "20000 pcs / 90 days hand made"}
                </li>

                <li>
                  <strong>Lead time:</strong> {product.leadTime || "60-90 days"}
                </li>

                <li>
                  <strong>Price:</strong> {product.priceType || "FOB"}
                </li>
              </ul>
            </div>

            <div className="details-static-image">
              <img
                src={getImageUrl(mainProductImage || STATIC_SIDE_IMAGE)}
                alt={product.title || "Natural bamboo material"}
                onError={(e) => {
                  e.currentTarget.src = STATIC_SIDE_IMAGE;
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {galleryImages.length > 0 && (
        <section className="details-gallery-section">
          <div className="container">
            <div className="product-gallery-grid">
              {galleryImages.map((img, index) => (
                <div
                  className="details-gallery-card"
                  key={img.public_id || img.url || index}
                >
                  <img
                    src={getImageUrl(img)}
                    alt={`${product.title} ${index + 1}`}
                    onError={(e) => {
                      e.currentTarget.src = "/logo.png";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <div className="container">
            <div className="section-title">
              <h2>Related Products</h2>
              <p>More products from the same category.</p>
            </div>

            <div className="related-product-grid">
              {relatedProducts.map((item) => (
                <Link
                  to={`/products/${item.slug}`}
                  className="related-product-card"
                  key={item._id}
                >
                  <img
                    src={getImageUrl(item.thumbnail || item.images?.[0])}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.src = "/logo.png";
                    }}
                  />

                  <h3>{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetails;
