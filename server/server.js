const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// Database connect
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "https://nurnobibamboocraft.com",
      "https://www.nurnobibamboocraft.com",
    ],
    credentials: true,
  }),
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Temporary local uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("NurnobibambooCraft API is running");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
    website: "NurnobibambooCraft",
  });
});

// Routes will be added step by step
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/categories", require("./routes/categoryRoutes"));
// app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/sliders", require("./routes/sliderRoutes"));
// app.use("/api/gallery", require("./routes/galleryRoutes"));
// app.use("/api/clients", require("./routes/clientRoutes"));
// app.use("/api/contact", require("./routes/contactRoutes"));
// app.use("/api/company", require("./routes/companyRoutes"));

// Error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
