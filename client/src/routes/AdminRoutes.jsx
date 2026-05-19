import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import AdminLayout from "../admin/AdminLayout";
import AdminLogin from "../admin/AdminLogin";
import AdminDashboard from "../admin/AdminDashboard";
import AdminProducts from "../admin/AdminProducts";
import AdminCategories from "../admin/AdminCategories";
import AdminSliders from "../admin/AdminSliders";
import AdminGallery from "../admin/AdminGallery";
import AdminMessages from "../admin/AdminMessages";
import AdminCompanyInfo from "../admin/AdminCompanyInfo";

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) {
    return <div className="admin-loading">Checking admin...</div>;
  }

  if (!admin) {
    return <Navigate to="/admin6935/login" replace />;
  }

  return children;
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="sliders" element={<AdminSliders />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="company" element={<AdminCompanyInfo />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
