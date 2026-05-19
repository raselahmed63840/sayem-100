import { useEffect, useState } from "react";
import api from "../api/axios";
import getImageUrl from "../utils/imageHelper";

const defaultForm = {
  title: "",
  subtitle: "",
  description: "",
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
  const [loading, setLoading] = useState(false);
  const [loadingSliders, setLoadingSliders] = useState(true);

  const loadSliders = async () => {
    try {
      setLoadingSliders(true);
      const { data } = await api.get("/sliders/admin/all");
      setSliders(data.sliders || []);
    } catch (error) {
      console.log("Slider load error:", error.response?.data || error.message);
      setSliders([]);
    } finally {
      setLoadingSliders(false);
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
    setStatus("");

    const fileInput = document.getElementById("sliderImageInput");
    if (fileInput) fileInput.value = "";
  };

  const handleEdit = (slider) => {
    setEditingId(slider._id);

    setForm({
      title: slider.title || "",
      subtitle: slider.subtitle || "",
      description: slider.description || "",
      buttonText: slider.buttonText || "Explore Products",
      buttonLink: slider.buttonLink || "/products",
      order: slider.order || 0,
      isActive: slider.isActive ?? true,
    });

    setImage(null);

    const fileInput = document.getElementById("sliderImageInput");
    if (fileInput) fileInput.value = "";

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this slider?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/sliders/${id}`);
      setStatus("Slider deleted successfully.");
      loadSliders();
    } catch (error) {
      console.log(
        "Slider delete error:",
        error.response?.data || error.message,
      );
      alert(error.response?.data?.message || "Slider delete failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    if (!editingId && !image) {
      setStatus("Please choose a slider image.");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    formData.append("description", form.description);
    formData.append("buttonText", form.buttonText);
    formData.append("buttonLink", form.buttonLink);
    formData.append("order", form.order);
    formData.append("isActive", form.isActive);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingId) {
        await api.put(`/sliders/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setStatus("Slider updated successfully.");
      } else {
        await api.post("/sliders", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setStatus("Slider saved successfully.");
      }

      resetForm();
      loadSliders();
    } catch (error) {
      console.log("Slider save error:", error.response?.data || error.message);
      setStatus(error.response?.data?.message || "Slider save failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Homepage Sliders</h1>
          <p>Manage homepage banner images and text.</p>
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

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Slider Description"
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
        </div>

        <div className="admin-grid-2">
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
          id="sliderImageInput"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <p className="admin-help-text">
          Recommended slider image size: 1920 × 650 px.
        </p>

        <div className="admin-actions">
          <button className="admin-btn" type="submit" disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update Slider" : "Add Slider"}
          </button>

          {editingId && (
            <button
              className="admin-btn light"
              type="button"
              onClick={resetForm}
              disabled={loading}
            >
              Cancel Edit
            </button>
          )}
        </div>

        {status && <p className="admin-status">{status}</p>}
      </form>

      {loadingSliders ? (
        <p className="admin-status">Loading sliders...</p>
      ) : sliders.length === 0 ? (
        <p className="admin-status">No slider found.</p>
      ) : (
        <div className="admin-card-grid">
          {sliders.map((slider) => (
            <div className="admin-content-card" key={slider._id}>
              <div className="admin-slider-image">
                <img
                  src={getImageUrl(slider.image)}
                  alt={slider.title}
                  onError={(e) => {
                    e.currentTarget.src = "/logo.png";
                  }}
                />
              </div>

              <div className="admin-content-body">
                <h3>{slider.title}</h3>

                {slider.subtitle && <p>{slider.subtitle}</p>}

                {slider.description && <p>{slider.description}</p>}

                <p>
                  <strong>Button:</strong>{" "}
                  {slider.buttonText || "Explore Products"}
                </p>

                <p>
                  <strong>Link:</strong> {slider.buttonLink || "/products"}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {slider.isActive ? "Active" : "Inactive"}
                </p>

                <p>
                  <strong>Order:</strong> {slider.order}
                </p>

                <div className="admin-actions">
                  <button
                    className="admin-btn"
                    type="button"
                    onClick={() => handleEdit(slider)}
                  >
                    Edit
                  </button>

                  <button
                    className="admin-btn danger"
                    type="button"
                    onClick={() => handleDelete(slider._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSliders;
