import multer from "multer";

const imageStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/images/");
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const JournalStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/journals/");
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

export const ImageUpload = multer({
  storage: imageStorage,
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


export const JournalsUpload = multer({
  storage: JournalStorage,
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