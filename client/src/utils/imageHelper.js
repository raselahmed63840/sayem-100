const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BACKEND_URL = API_URL.replace(/\/api\/?$/, "");

export const getImageUrl = (image, fallback = "/logo.png") => {
  try {
    const url = typeof image === "string" ? image : image?.url;

    if (!url) return fallback;

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    if (url.startsWith("/")) {
      return `${BACKEND_URL}${url}`;
    }

    return `${BACKEND_URL}/${url}`;
  } catch {
    return fallback;
  }
};

export const optimizeCloudinaryImage = (image, options = {}) => {
  const fallback = options.fallback || "/logo.png";
  const url = getImageUrl(image, fallback);

  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  const width = options.width || 1600;
  const height = options.height;
  const quality = options.quality || "auto";
  const format = options.format || "auto";

  const transforms = [`f_${format}`, `q_${quality}`, `w_${width}`];

  if (height) {
    transforms.push(`h_${height}`, "c_fill");
  }

  return url.replace("/upload/", `/upload/${transforms.join(",")}/`);
};

export default getImageUrl;
