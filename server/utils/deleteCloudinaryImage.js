const cloudinary = require("../config/cloudinary");

const deleteCloudinaryImage = async (publicId) => {
  try {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log("Cloudinary delete error:", error.message);
  }
};

module.exports = deleteCloudinaryImage;
