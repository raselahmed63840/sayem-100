import { useEffect, useState } from "react";
import api from "../api/axios";

const defaultForm = {
  title: "",
  type: "product",
  order: 0,
  isActive: true,
};

const AdminGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  const loadGallery = async () => {
    try {
      const { data } = await api.get("/gallery/admin/all");
      setGallery(data.gallery || []);
    } catch {
      setGallery([]);
    }
  };

  useEffect(() => {
    loadGallery();
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

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title || "",
      type: item.type || "product",
      order: item.order || 0,
      isActive: item.isActive ?? true,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this gallery image?")) return;

    try {
      await api.delete(`/gallery/${id}`);
      loadGallery();
    } catch {
      alert("Gallery delete failed.");
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
        await api.put(`/gallery/${editingId}`, formData);
      } else {
        await api.post("/gallery", formData);
      }

      setStatus("Gallery saved successfully.");
      resetForm();
      loadGallery();
    } catch {
      setStatus("Gallery save failed.");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Gallery</h1>
          <p>Upload product, artisan, factory and craft story photos.</p>
        </div>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Gallery Title"
          required
        />

        <div className="admin-grid-2">
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="product">Product</option>
            <option value="factory">Factory</option>
            <option value="artisan">Artisan</option>
            <option value="certificate">Certificate</option>
            <option value="other">Other</option>
          </select>

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
            {editingId ? "Update Gallery" : "Add Gallery"}
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
        {gallery.map((item) => (
          <div className="admin-card" key={item._id}>
            <img src={item.image?.url || "/logo.png"} alt={item.title} />
            <h3>{item.title}</h3>
            <p>Type: {item.type}</p>
            <p>Status: {item.isActive ? "Active" : "Inactive"}</p>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
