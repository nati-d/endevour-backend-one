import multer from "multer";
import path from "path";

const uploadFile = (director: string) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public/${director}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  });

  const upload = multer({ storage: storage });

  return upload;
};

export default uploadFile;
