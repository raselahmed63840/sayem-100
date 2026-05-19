import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getImageUrl, optimizeCloudinaryImage } from "../utils/imageHelper";

const fallbackSlides = [
  {
    title: "Eco-Friendly Bamboo Craft",
    subtitle:
      "Handmade bamboo products crafted with tradition, sustainability and care.",
    buttonText: "Explore Products",
    buttonLink: "/products",
    image: {
      url: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1500&q=80",
    },
  },
  {
    title: "Crafted by Skilled Artisans",
    subtitle:
      "Supporting women artisans, rural communities and sustainable livelihoods.",
    buttonText: "Our Story",
    buttonLink: "/about",
    image: {
      url: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=1500&q=80",
    },
  },
  {
    title: "Natural Bamboo Products",
    subtitle:
      "Furniture, home decor, kitchen accessories, storage solutions and gifts.",
    buttonText: "Send Inquiry",
    buttonLink: "/contact",
    image: {
      url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1500&q=80",
    },
  },
];

const HeroSlider = ({ slides = [] }) => {
  const sliderItems = useMemo(() => {
    return slides.length > 0 ? slides : fallbackSlides;
  }, [slides]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (sliderItems.length <= 1) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % sliderItems.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [sliderItems.length]);

  const current = sliderItems[active];

  return (
    <section className="hero">
      {sliderItems.map((slide, index) => (
        <div
          key={slide._id || index}
          className={`hero-slide ${index === active ? "active" : ""}`}
        >
          <img
            src={optimizeCloudinaryImage(getImageUrl(slide.image), 1500)}
            alt={slide.title}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      <div className="hero-overlay"></div>

      <div className="container hero-content">
        <span className="hero-kicker">Founded in 2002</span>
        <h2>{current?.title}</h2>
        <p>{current?.subtitle}</p>

        <Link to={current?.buttonLink || "/products"} className="primary-btn">
          {current?.buttonText || "Explore Products"}
        </Link>
      </div>

      <div className="hero-dots">
        {sliderItems.map((_, index) => (
          <button
            key={index}
            className={index === active ? "active" : ""}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
