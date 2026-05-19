import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminCompanyInfo = () => {
  const [form, setForm] = useState({
    companyName: "Nurnobi Bamboo Craft",
    tagline: "Manufacturer, Exporter, Wholesaler & Supplier",
    aboutTitle: "All Kinds of Handmade Bamboo Products",
    aboutDescription: "",
    companyProfile: "",
    messageTopTeam: "",
    address: "",
    email: "contact@nurnobibamboocraft.com",
    phone: "+880 1863-840408",
    whatsapp: "+880 1863-840408",
    facebook: "",
    linkedin: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const { data } = await api.get("/company");

        if (data.companyInfo) {
          setForm((prev) => ({
            ...prev,
            ...data.companyInfo,
          }));
        }
      } catch {
        setStatus("Company information load failed.");
      }
    };

    loadCompany();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");

    try {
      await api.put("/company", form);
      setStatus("Company information updated successfully.");
    } catch {
      setStatus("Update failed.");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Company Content</h1>
          <p>Update brand information, contact details, mission and story.</p>
        </div>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-grid-2">
          <input
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="Company Name"
          />
          <input
            name="tagline"
            value={form.tagline}
            onChange={handleChange}
            placeholder="Tagline"
          />
        </div>

        <input
          name="aboutTitle"
          value={form.aboutTitle}
          onChange={handleChange}
          placeholder="About Title"
        />

        <textarea
          name="aboutDescription"
          value={form.aboutDescription}
          onChange={handleChange}
          placeholder="About Description"
        />

        <textarea
          name="companyProfile"
          value={form.companyProfile}
          onChange={handleChange}
          placeholder="Company Profile"
        />

        <textarea
          name="messageTopTeam"
          value={form.messageTopTeam}
          onChange={handleChange}
          placeholder="Mission / Vision / Commitment / Craft Story"
        />

        <div className="admin-grid-2">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <input
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
            placeholder="WhatsApp"
          />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <input
            name="facebook"
            value={form.facebook}
            onChange={handleChange}
            placeholder="Facebook URL"
          />
          <input
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn URL"
          />
        </div>

        <button className="admin-btn" type="submit">
          Save Company Info
        </button>

        {status && <p className="admin-status">{status}</p>}
      </form>
    </div>
  );
};

export default AdminCompanyInfo;
