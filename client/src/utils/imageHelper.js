export const getImageUrl = (image, fallback = "/logo.png") => {
  if (!image) return fallback;
  if (typeof image === "string") return image;
  return image.url || fallback;
};

export const optimizeCloudinaryImage = (url, width = 900) => {
  if (!url) return "/logo.png";

  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
};
