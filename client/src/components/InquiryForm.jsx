import { useState } from "react";
import api from "../api/axios";

const InquiryForm = ({ productName = "" }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    productName,
    subject: "Product Inquiry",
    message: productName ? `I want to know more about ${productName}.` : "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await api.post("/contact", form);

      setStatus("Message sent successfully.");

      setForm({
        name: "",
        email: "",
        phone: "",
        productName,
        subject: "Product Inquiry",
        message: productName ? `I want to know more about ${productName}.` : "",
      });
    } catch {
      setStatus("Message failed. Please try again.");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        name="productName"
        placeholder="Product Name"
        value={form.productName}
        onChange={handleChange}
      />

      <input
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
      />

      <textarea
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
        required
      />

      <button className="primary-btn" type="submit">
        Submit Inquiry
      </button>

      {status && <p className="form-status">{status}</p>}
    </form>
  );
};

export default InquiryForm;
