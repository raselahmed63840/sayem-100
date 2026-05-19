import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLogin = () => {
  const { admin, login } = useAuth();
  const navigate = useNavigate();

  // Default login credentials
  const [email, setEmail] = useState("rasel63840@gmail.com");
  const [password, setPassword] = useState("123456");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (admin) {
    return <Navigate to="/admin6935/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/admin6935/dashboard");
    } catch (error) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <p>Nurnobi Bamboo Craft control panel</p>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="admin-btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="admin-error">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
