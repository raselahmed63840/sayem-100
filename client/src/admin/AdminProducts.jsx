import { useEffect, useState } from "react";
import api from "../api/axios";

const defaultForm = {
  title: "",
  slug: "",
  category: "",
  productType: "",
  shortDescription: "",
  description: "",
  material: "Bamboo",
  scientificName: "Bambusa Vulgaris",
  origin: "Bangladesh",
  color: "Natural / Any Color",
  size: "As per buyer requirements",
  moq: "500-3000 pcs",
  capacity: "20000 pcs / 90 days handmade",
  leadTime: "60-90 days",
  priceType: "FOB",
  usage: "",
  buyerRequirement: "Customization available as per buyer requirements.",
  isFeatured: false,
  status: "active",
  order: 0,
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [images, setImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [statusText, setStatusText] = useState("");

  const loadData = async () => {
    try {
      const [productRes, categoryRes] = await Promise.all([
        api.get("/products?status=all&limit=1000"),
        api.get("/categories/admin/all"),
      ]);

      setProducts(productRes.data.products || []);
      setCategories(categoryRes.data.categories || []);
    } catch {
      setProducts([]);
      setCategories([]);
    }
  };

  useEffect(() => {
    loadData();
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
    setImages([]);
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setEditingId(product._id);

    setForm({
      title: product.title || "",
      slug: product.slug || "",
      category: product.category?._id || product.category || "",
      productType: product.productType || "",
      shortDescription: product.shortDescription || "",
      description: product.description || "",
      material: product.material || "Bamboo",
      scientificName: product.scientificName || "Bambusa Vulgaris",
      origin: product.origin || "Bangladesh",
      color: product.color || "Natural / Any Color",
      size: product.size || "As per buyer requirements",
      moq: product.moq || "500-3000 pcs",
      capacity: product.capacity || "20000 pcs / 90 days handmade",
      leadTime: product.leadTime || "60-90 days",
      priceType: product.priceType || "FOB",
      usage: product.usage || "",
      buyerRequirement: product.buyerRequirement || "",
      isFeatured: product.isFeatured || false,
      status: product.status || "active",
      order: product.order || 0,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      loadData();
    } catch {
      alert("Product delete failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusText("Saving...");

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    Array.from(images).forEach((img) => {
      formData.append("images", img);
    });

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, formData);
      } else {
        await api.post("/products", formData);
      }

      setStatusText("Product saved successfully.");
      resetForm();
      loadData();
    } catch (error) {
      setStatusText(error.response?.data?.message || "Product save failed.");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Products</h1>
          <p>Add/edit bamboo products and all buyer requirement fields.</p>
        </div>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-grid-2">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Product Title"
            required
          />
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="Slug optional"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option value={cat._id} key={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            name="productType"
            value={form.productType}
            onChange={handleChange}
            placeholder="Product Type e.g. Bamboo Basket"
          />
        </div>

        <textarea
          name="shortDescription"
          value={form.shortDescription}
          onChange={handleChange}
          placeholder="Short Description"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Full Description"
        />

        <div className="admin-grid-2">
          <input
            name="material"
            value={form.material}
            onChange={handleChange}
            placeholder="Material"
          />
          <input
            name="scientificName"
            value={form.scientificName}
            onChange={handleChange}
            placeholder="Scientific Name"
          />
          <input
            name="origin"
            value={form.origin}
            onChange={handleChange}
            placeholder="Origin"
          />
          <input
            name="color"
            value={form.color}
            onChange={handleChange}
            placeholder="Color"
          />
          <input
            name="size"
            value={form.size}
            onChange={handleChange}
            placeholder="Size"
          />
          <input
            name="moq"
            value={form.moq}
            onChange={handleChange}
            placeholder="MOQ"
          />
          <input
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            placeholder="Capacity"
          />
          <input
            name="leadTime"
            value={form.leadTime}
            onChange={handleChange}
            placeholder="Lead Time"
          />
          <input
            name="priceType"
            value={form.priceType}
            onChange={handleChange}
            placeholder="Price Type e.g. FOB"
          />
          <input
            name="usage"
            value={form.usage}
            onChange={handleChange}
            placeholder="Usage"
          />
        </div>

        <textarea
          name="buyerRequirement"
          value={form.buyerRequirement}
          onChange={handleChange}
          placeholder="Buyer Requirement / Customization"
        />

        <div className="admin-grid-2">
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
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
              name="isFeatured"
              type="checkbox"
              checked={form.isFeatured}
              onChange={handleChange}
            />
            Featured Product
          </label>
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />

        <div className="admin-actions">
          <button className="admin-btn" type="submit">
            {editingId ? "Update Product" : "Add Product"}
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

        {statusText && <p className="admin-status">{statusText}</p>}
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Featured</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    className="admin-thumb"
                    src={
                      product.thumbnail?.url ||
                      product.images?.[0]?.url ||
                      "/logo.png"
                    }
                    alt={product.title}
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.category?.name}</td>
                <td>{product.isFeatured ? "Yes" : "No"}</td>
                <td>{product.status}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
