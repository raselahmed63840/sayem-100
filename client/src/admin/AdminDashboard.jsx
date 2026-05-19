import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    sliders: 0,
    gallery: 0,
    messages: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [catRes, productRes, sliderRes, galleryRes, messageRes] =
          await Promise.all([
            api.get("/categories/admin/all"),
            api.get("/products?status=all&limit=1000"),
            api.get("/sliders/admin/all"),
            api.get("/gallery/admin/all"),
            api.get("/contact/messages"),
          ]);

        setStats({
          categories: catRes.data.categories?.length || 0,
          products:
            productRes.data.total || productRes.data.products?.length || 0,
          sliders: sliderRes.data.sliders?.length || 0,
          gallery: galleryRes.data.gallery?.length || 0,
          messages: messageRes.data.messages?.length || 0,
        });
      } catch {
        setStats({
          categories: 0,
          products: 0,
          sliders: 0,
          gallery: 0,
          messages: 0,
        });
      }
    };

    loadStats();
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Dashboard</h1>
          <p>Manage Nurnobi Bamboo Craft website content.</p>
        </div>
      </div>

      <div className="admin-stat-grid">
        <div>
          <h3>{stats.categories}</h3>
          <p>Bamboo Categories</p>
        </div>
        <div>
          <h3>{stats.products}</h3>
          <p>Products</p>
        </div>
        <div>
          <h3>{stats.sliders}</h3>
          <p>Sliders</p>
        </div>
        <div>
          <h3>{stats.gallery}</h3>
          <p>Gallery Images</p>
        </div>
        <div>
          <h3>{stats.messages}</h3>
          <p>Inquiry Messages</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
