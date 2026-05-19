import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="page-section">
      <div className="container empty-state">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="primary-btn">
          Back Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
