import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../../shared/config/cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export default upload;
