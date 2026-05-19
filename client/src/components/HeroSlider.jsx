import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { optimizeCloudinaryImage } from "../utils/imageHelper";

const HeroSlider = ({ slides = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlides = Array.isArray(slides)
    ? slides.filter((slide) => slide?.isActive !== false)
    : [];

  useEffect(() => {
    if (activeSlides.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === activeSlides.length - 1 ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [activeSlides.length]);

  if (activeSlides.length === 0) {
    return (
      <section className="home-hero">
        <div className="home-hero-content">
          <p>Nurnobi Bamboo Craft</p>
          <h1>All Kinds of Handmade Bamboo Products</h1>
          <span>Eco-friendly handmade bamboo products from Bangladesh.</span>
          <Link to="/products" className="hero-btn">
            Explore Products
          </Link>
        </div>
      </section>
    );
  }

  const slide = activeSlides[activeIndex];

  return (
    <section className="hero-slider">
      <div className="hero-slide">
        <img
          src={optimizeCloudinaryImage(slide.image, {
            width: 1600,
            height: 650,
            fallback: "/logo.png",
          })}
          alt={slide.title || "Bamboo Craft Slider"}
          onError={(e) => {
            e.currentTarget.src = "/logo.png";
          }}
        />

        <div className="hero-dark-overlay" />

        <div className="hero-slide-content">
          <p>Nurnobi Bamboo Craft</p>
          <h1>{slide.title}</h1>

          {slide.description && <span>{slide.description}</span>}

          {slide.buttonText && (
            <Link to={slide.buttonLink || "/products"} className="hero-btn">
              {slide.buttonText}
            </Link>
          )}
        </div>
      </div>

      {activeSlides.length > 1 && (
        <div className="hero-dots">
          {activeSlides.map((item, index) => (
            <button
              key={item._id || index}
              type="button"
              className={index === activeIndex ? "active" : ""}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSlider;
