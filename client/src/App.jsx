import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

import Home from "./pages/Home";
import About from "./pages/About";
import ProductDescription from "./pages/ProductDescription";
import ProductGallery from "./pages/ProductGallery";
import ProductDetails from "./pages/ProductDetails";
import PhotoGallery from "./pages/PhotoGallery";
import SustainabilityCraftStory from "./pages/SustainabilityCraftStory";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import AdminRoutes from "./routes/AdminRoutes";

function App() {
  const isAdminPath = window.location.pathname.startsWith("/admin6935");

  return (
    <>
      {!isAdminPath && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product-description" element={<ProductDescription />} />
          <Route path="/products" element={<ProductGallery />} />
          <Route
            path="/products/category/:categoryId"
            element={<ProductGallery />}
          />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/gallery" element={<PhotoGallery />} />
          <Route
            path="/sustainability"
            element={<SustainabilityCraftStory />}
          />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin6935/*" element={<AdminRoutes />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminPath && <Footer />}
      {!isAdminPath && <WhatsAppButton />}
    </>
  );
}

export default App;
