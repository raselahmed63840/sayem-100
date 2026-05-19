import SEO from "../components/SEO";

const ProductDescription = () => {
  return (
    <section className="page-section">
      <SEO
        title="Raw Material and Product Description | Nurnobi Bamboo Craft"
        description="Browse bamboo product details, origin, MOQ, capacity, lead time and FOB information."
      />

      <div className="container">
        <div className="page-title">
          <span className="section-kicker">
            Raw Material and Product Description
          </span>
          <h1>Browse Our Bamboo Collection Made from Natural Fibers</h1>
          <p>
            Bamboo is a sustainable natural material used to prepare different
            types of baskets, trays, lampshades, furniture, planters and other
            eco-friendly handicraft products.
          </p>
        </div>

        <div className="raw-material-card">
          <h2>Bamboo</h2>

          <div className="spec-grid">
            <p>
              <strong>Scientific Name:</strong> Bambusa Vulgaris
            </p>
            <p>
              <strong>Origin:</strong> Bangladesh
            </p>
            <p>
              <strong>Color:</strong> Natural / Any Color
            </p>
            <p>
              <strong>Size:</strong> As per buyer requirements
            </p>
            <p>
              <strong>MOQ:</strong> 500-3000 pcs
            </p>
            <p>
              <strong>Capacity:</strong> 20000 pcs / 90 days handmade
            </p>
            <p>
              <strong>Lead Time:</strong> 60-90 days
            </p>
            <p>
              <strong>Price:</strong> FOB
            </p>
          </div>
        </div>

        <div className="description-grid">
          <div className="description-card">
            <h2>Bamboo Serving Tray</h2>
            <p>
              Handmade bamboo serving trays suitable for home, restaurant, hotel
              and gift use. Available in natural or customized finish.
            </p>
          </div>

          <div className="description-card">
            <h2>Bamboo Lamps & Lanterns</h2>
            <p>
              Decorative bamboo lighting products crafted to bring natural
              warmth and artisan beauty into interiors.
            </p>
          </div>

          <div className="description-card">
            <h2>Bamboo File Holder & Tissue Box</h2>
            <p>
              Functional and decorative office and home products made with
              bamboo weaving and traditional patterns.
            </p>
          </div>

          <div className="description-card">
            <h2>Bamboo Basket</h2>
            <p>
              Storage, laundry, planter, pet basket and home organization
              baskets made from eco-friendly bamboo.
            </p>
          </div>

          <div className="description-card">
            <h2>Bamboo Glass</h2>
            <p>
              Natural bamboo cups and glass-style products for eco-lifestyle and
              gift collections.
            </p>
          </div>

          <div className="description-card">
            <h2>Hanging Mirror</h2>
            <p>
              Decorative bamboo mirror products designed for home décor,
              boutique interiors and lifestyle spaces.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
