import SEO from "../components/SEO";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="page-section">
      <SEO
        title="About Nurnobi Bamboo Craft | Handmade Bamboo Products"
        description="Nurnobi Bamboo Craft is an eco-friendly bamboo craft brand from Bangladesh, founded in 2002."
      />

      <div className="container content-page">
        <span className="section-kicker">About Us</span>
        <h1>Nurnobi Bamboo Craft</h1>

        <p>
          Nurnobi Bamboo Craft is more than a handcrafted brand. It is a story
          of tradition, resilience and human connection woven through every
          creation. Founded in 2002, we are dedicated to preserving the timeless
          beauty of natural craftsmanship by transforming bamboo and other
          eco-friendly materials into elegant products.
        </p>

        <p>
          Behind every product stands the hands of skilled women and men
          artisans whose creativity and dedication bring life to raw materials.
          Through their work, we proudly support over 250+ underprivileged
          individuals and help sustain more than 1000+ families.
        </p>

        <div className="about-highlight-grid">
          <div>
            <strong>250+</strong>
            <span>Underprivileged Individuals Supported</span>
          </div>
          <div>
            <strong>1000+</strong>
            <span>Families Sustained</span>
          </div>
          <div>
            <strong>2002</strong>
            <span>Brand Founded</span>
          </div>
        </div>

        <div className="mission-grid">
          <div className="description-card">
            <h2>Our Mission</h2>
            <p>
              Our mission is to turn every handmade piece into a meaningful
              experience—one that carries emotion, culture and care. We are
              committed to preserving traditional crafts, building sustainable
              skills, strengthening the handmade craft ecosystem and creating
              products that inspire, educate and tell stories.
            </p>
          </div>

          <div className="description-card">
            <h2>Our Vision</h2>
            <p>
              We envision a future where rural and marginalized women are not
              just participants but leaders in the handicraft industry, shaping
              their own economic and creative destinies.
            </p>
          </div>

          <div className="description-card">
            <h2>Our Commitment</h2>
            <p>
              Our commitment goes beyond craft. It is a commitment to people,
              heritage and a more meaningful way of living and creating.
            </p>
          </div>
        </div>

        <Link to="/products" className="primary-btn">
          Explore Products
        </Link>
      </div>
    </section>
  );
};

export default About;
