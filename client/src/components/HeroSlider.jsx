import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/imageHelper";

const HeroSlider = ({ slides = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlides = Array.isArray(slides)
    ? slides.filter((slide) => slide?.isActive !== false)
    : [];

  useEffect(() => {
    if (activeSlides.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) =>
        prev === activeSlides.length - 1 ? 0 : prev + 1,
      );
    }, 4500);

    return () => clearInterval(timer);
  }, [activeSlides.length]);

  if (activeSlides.length === 0) {
    return (
      <section className="nb-hero-slider">
        <div className="nb-hero-fallback">
          <div className="nb-hero-overlay" />

          <div className="nb-hero-content">
            <p>Nurnobi Bamboo Craft</p>
            <h1>All Kinds of Handmade Bamboo Products</h1>
            <span>Eco-friendly handmade bamboo products from Bangladesh.</span>

            <Link to="/products" className="nb-hero-btn">
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="nb-hero-slider">
      {activeSlides.map((slide, index) => (
        <div
          className={`nb-hero-slide ${index === activeIndex ? "active" : ""}`}
          key={slide._id || index}
        >
          <img
            className="nb-hero-image"
            src={getImageUrl(slide.image)}
            alt={slide.title || "Nurnobi Bamboo Craft"}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <div className="nb-hero-overlay" />

          <div className="nb-hero-content">
            <p>{slide.subtitle || "Nurnobi Bamboo Craft"}</p>

            <h1>{slide.title || "Handmade Bamboo Products"}</h1>

            <span>
              {slide.description ||
                "Eco-friendly bamboo products made with natural materials, traditional craftsmanship and modern design."}
            </span>

            <Link to={slide.buttonLink || "/products"} className="nb-hero-btn">
              {slide.buttonText || "Explore Products"}
            </Link>
          </div>
        </div>
      ))}

      {activeSlides.length > 1 && (
        <div className="nb-hero-dots">
          {activeSlides.map((slide, index) => (
            <button
              key={slide._id || index}
              type="button"
              className={index === activeIndex ? "active" : ""}
              onClick={() => setActiveIndex(index)}
              aria-label={`Slider ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSlider;
