import SEO from "../components/SEO";
import InquiryForm from "../components/InquiryForm";

const Contact = () => {
  return (
    <section className="page-section">
      <SEO
        title="Contact Nurnobi Bamboo Craft"
        description="Contact Nurnobi Bamboo Craft for bamboo product inquiry, quotation, export discussion and business communication."
      />

      <div className="container contact-grid">
        <div>
          <span className="section-kicker">Contact / Inquiry</span>
          <h1>Get in Touch With Nurnobi Bamboo Craft</h1>

          <p>
            For product inquiry, quotation, export discussion, sample request or
            company information, send us a message. We will contact you as soon
            as possible.
          </p>

          <div className="contact-info">
            <p>
              <strong>Email:</strong> contact@nurnobibamboocraft.com
            </p>
            <p>
              <strong>Phone:</strong> +880 1719-632705
            </p>
            <p>
              <strong>WhatsApp:</strong> +880 1719-632705
            </p>
            <p>
              <strong>Origin:</strong> Bangladesh
            </p>
          </div>
        </div>

        <InquiryForm />
      </div>
    </section>
  );
};

export default Contact;
