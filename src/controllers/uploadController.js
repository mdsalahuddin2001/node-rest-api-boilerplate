const multer = require('multer');
const streamifier = require('streamifier');

const upload = multer();
const ImageKit = require('imagekit');

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
