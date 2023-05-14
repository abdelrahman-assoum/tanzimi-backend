import multer from "multer";

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/images/");
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const Upload = multer({
  storage: Storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      console.log("only jpg & png file supported");
      callback(null, false);
    }
  },
});

export default Upload;
