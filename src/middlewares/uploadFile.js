const multer = require("multer");
const createError = require("http-errors");
const { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } = require("../config");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(createError(400, "Only image file are allowed."), false);
  }
  if (file.size > MAX_FILE_SIZE) {
    return cb(createError(400, "File size is too big"), false);
  }

  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    return cb(
      createError(400, "Only jpg,jpeg and png files are allowed."),
      false
    );
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter,
});

module.exports = upload;
