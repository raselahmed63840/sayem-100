import { useEffect, useState } from "react";
import api from "../api/axios";

const defaultForm = {
  name: "",
  slug: "",
  description: "",
  order: 0,
  isActive: true,
};

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  const loadCategories = async () => {
    try {
      const { data } = await api.get("/categories/admin/all");
      setCategories(data.categories || []);
    } catch {
      setCategories([]);
    }
  };

  useEffect(() => {
    loadCategories();
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

  const handleEdit = (category) => {
    setEditingId(category._id);
    setForm({
      name: category.name || "",
      slug: category.slug || "",
      description: category.description || "",
      order: category.order || 0,
      isActive: category.isActive ?? true,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await api.delete(`/categories/${id}`);
      loadCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
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
        await api.put(`/categories/${editingId}`, formData);
      } else {
        await api.post("/categories", formData);
      }

      setStatus("Category saved successfully.");
      resetForm();
      loadCategories();
    } catch (error) {
      setStatus(error.response?.data?.message || "Category save failed.");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Bamboo Categories</h1>
          <p>Add/edit product categories.</p>
        </div>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-grid-2">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Category Name"
            required
          />
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="Slug optional"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />

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
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className="admin-actions">
          <button className="admin-btn" type="submit">
            {editingId ? "Update Category" : "Add Category"}
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

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Order</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td>
                  <img
                    className="admin-thumb"
                    src={cat.image?.url || "/logo.png"}
                    alt={cat.name}
                  />
                </td>
                <td>{cat.name}</td>
                <td>{cat.slug}</td>
                <td>{cat.isActive ? "Active" : "Inactive"}</td>
                <td>{cat.order}</td>
                <td>
                  <button onClick={() => handleEdit(cat)}>Edit</button>
                  <button onClick={() => handleDelete(cat._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategories;
