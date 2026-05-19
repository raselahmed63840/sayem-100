import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin6935/login");
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>Nurnobi</h2>
          <p>Bamboo Craft Admin</p>
        </div>

        <nav className="admin-menu">
          <NavLink to="/admin6935/dashboard">Dashboard</NavLink>
          <NavLink to="/admin6935/categories">Bamboo Categories</NavLink>
          <NavLink to="/admin6935/products">Products</NavLink>
          <NavLink to="/admin6935/sliders">Sliders</NavLink>
          <NavLink to="/admin6935/gallery">Gallery</NavLink>
          <NavLink to="/admin6935/messages">Inquiry Messages</NavLink>
          <NavLink to="/admin6935/company">Company Content</NavLink>
        </nav>

        <button className="admin-logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <section className="admin-main">
        <Outlet />
      </section>
    </div>
  );
};

export default AdminLayout;
