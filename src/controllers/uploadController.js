const multer = require("multer");
const ImageKit = require("imagekit");
const createError = require("http-errors");
const { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } = require("../config");

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
  req.body.image = file.originalname;
  cb(null, true);
};

const upload = multer({
  fileFilter,
});

// @desc      Upload file
// @route     POST /api/v1/upload
// @access    Private

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICK_KEY,
  privateKey: process.env.IMAGEIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});

exports.uploadFile = async (req, res, next) => {
  imagekit
    .upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      useUniqueFileName: true,
    })
    .then((res) => {
      req.body.image = res.url;
      req.uploadedFile = res;
      next();
    })
    .catch((err) => {
      next(err);
    });
};

exports.imagekit = imagekit;
exports.upload = upload;
