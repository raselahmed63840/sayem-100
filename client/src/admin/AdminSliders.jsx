import { useEffect, useState } from "react";
import api from "../api/axios";

const defaultForm = {
  title: "",
  subtitle: "",
  buttonText: "Explore Products",
  buttonLink: "/products",
  order: 0,
  isActive: true,
};

const AdminSliders = () => {
  const [sliders, setSliders] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  const loadSliders = async () => {
    try {
      const { data } = await api.get("/sliders/admin/all");
      setSliders(data.sliders || []);
    } catch {
      setSliders([]);
    }
  };

  useEffect(() => {
    loadSliders();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(defaultForm);
    setImage(null);
    setEditingId(null);
  };

  const handleEdit = (slider) => {
    setEditingId(slider._id);
    setForm({
      title: slider.title || "",
      subtitle: slider.subtitle || "",
      buttonText: slider.buttonText || "Explore Products",
      buttonLink: slider.buttonLink || "/products",
      order: slider.order || 0,
      isActive: slider.isActive ?? true,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this slider?")) return;

    try {
      await api.delete(`/sliders/${id}`);
      loadSliders();
    } catch {
      alert("Slider delete failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingId) {
        await api.put(`/sliders/${editingId}`, formData);
      } else {
        await api.post("/sliders", formData);
      }

      setStatus("Slider saved successfully.");
      resetForm();
      loadSliders();
    } catch {
      setStatus("Slider save failed.");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Homepage Sliders</h1>
          <p>Manage hero banner images and text.</p>
        </div>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Slider Title"
          required
        />

        <textarea
          name="subtitle"
          value={form.subtitle}
          onChange={handleChange}
          placeholder="Subtitle"
        />

        <div className="admin-grid-2">
          <input
            name="buttonText"
            value={form.buttonText}
            onChange={handleChange}
            placeholder="Button Text"
          />
          <input
            name="buttonLink"
            value={form.buttonLink}
            onChange={handleChange}
            placeholder="Button Link"
          />
          <input
            name="order"
            type="number"
            value={form.order}
            onChange={handleChange}
            placeholder="Order"
          />

          <label className="admin-checkbox">
            <input
              name="isActive"
              type="checkbox"
              checked={form.isActive}
              onChange={handleChange}
            />
            Active
          </label>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className="admin-actions">
          <button className="admin-btn" type="submit">
            {editingId ? "Update Slider" : "Add Slider"}
          </button>

          {editingId && (
            <button
              className="admin-btn light"
              type="button"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}
        </div>

        {status && <p className="admin-status">{status}</p>}
      </form>

      <div className="admin-card-grid">
        {sliders.map((slider) => (
          <div className="admin-card" key={slider._id}>
            <img src={slider.image?.url || "/logo.png"} alt={slider.title} />
            <h3>{slider.title}</h3>
            <p>{slider.subtitle}</p>
            <p>Status: {slider.isActive ? "Active" : "Inactive"}</p>
            <button onClick={() => handleEdit(slider)}>Edit</button>
            <button onClick={() => handleDelete(slider._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSliders;
