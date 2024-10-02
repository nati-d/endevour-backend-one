import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = () => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'devidends',
      resource_type: 'auto',
      public_id: (req: { body: { userId: any; }; }, file: any) => {
        const userId = req.body.userId; 
        const timestamp = Date.now();
        return `user_${userId}/image_${timestamp}`; 
      },
          },
  });

  const parser = multer({ storage: storage })

  return parser;
};

export default uploadFile;
