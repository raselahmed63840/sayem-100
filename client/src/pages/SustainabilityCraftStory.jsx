import SEO from "../components/SEO";
import { Link } from "react-router-dom";

const SustainabilityCraftStory = () => {
  return (
    <section className="page-section">
      <SEO
        title="Sustainability and Craft Story | Nurnobi Bamboo Craft"
        description="Learn about Nurnobi Bamboo Craft's commitment to sustainability, artisans, community development and ethical production."
      />

      <div className="container content-page">
        <span className="section-kicker">Sustainability / Craft Story</span>
        <h1>Crafting Beauty, Uplifting People, Preserving Nature</h1>

        <p>
          At Nurnobi Bamboo Craft, sustainability is not only a design choice.
          It is part of our identity. Every handmade product reflects bamboo,
          natural fibers, skilled hands, traditional knowledge and a responsible
          vision for the future.
        </p>

        <div className="story-grid">
          <div className="description-card">
            <h2>Empowering Artisans</h2>
            <p>
              We support skilled women and men artisans by creating employment
              opportunities and helping them build dignity, independence and
              hope through craft.
            </p>
          </div>

          <div className="description-card">
            <h2>Preserving Heritage</h2>
            <p>
              We preserve traditional bamboo craftsmanship and connect it with
              modern design so that local heritage can reach global customers.
            </p>
          </div>

          <div className="description-card">
            <h2>Sustainable Materials</h2>
            <p>
              Bamboo is renewable, versatile and eco-friendly. Our products
              promote a natural lifestyle and reduce dependency on harmful
              synthetic materials.
            </p>
          </div>

          <div className="description-card">
            <h2>Community Development</h2>
            <p>
              Through ethical production and fair opportunities, we contribute
              to rural livelihoods and community growth in Bangladesh.
            </p>
          </div>
        </div>

        <Link to="/contact" className="primary-btn">
          Work With Us
        </Link>
      </div>
    </section>
  );
};

export default SustainabilityCraftStory;
