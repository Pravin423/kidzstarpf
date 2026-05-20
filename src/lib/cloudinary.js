import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a Buffer to Cloudinary.
 * @param {Buffer} buffer
 * @param {object} options  - Cloudinary upload options (folder, resource_type, etc.)
 * @returns {Promise<object>} Cloudinary upload result
 */
export function uploadToCloudinary(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });
}

/**
 * Delete a resource from Cloudinary by its public_id.
 * @param {string} publicId
 * @param {"image"|"video"} resourceType
 */
export async function deleteFromCloudinary(publicId, resourceType = "image") {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export default cloudinary;
