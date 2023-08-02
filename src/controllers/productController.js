const slugify = require('slugify');
const Product = require('../models/Product');
const createError = require('http-errors');
const asyncHandler = require('../middlewares/asyncHandler');
const { successResponse, errorResponse } = require('../utils/sendResponse');
const { imagekit } = require('./uploadController');
// @desc      Get Products
// @route     POST /api/products
// @access    Public
exports.getProducts = asyncHandler(async (req, res, next) => {
	const products = await Product.find({});
	successResponse(res, { data: products });
});
// @desc      Get Product By Id
// @route     POST /api/v1/products/:id
// @access    Public
exports.getSingleProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id).populate([
		{
			path: 'reviews',
			model: 'Review',
			populate: {
				path: 'user',
				model: 'User',
			},
		},
	]);

	if (!product) {
		throw createError(404, 'Product not found');
	}
	successResponse(res, { data: product });
});
// @desc      Delete Product By Id
// @route     DELETE /api/products/:id
// @access    Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findByIdAndDelete(req.params.id);
	if (!product) {
		throw createError((404, 'Product not found!'));
	}
	successResponse(res, { data: product });
});

// @desc      Add Product
// @route     POST /api/v1/products
// @access    Private
exports.addProduct = async (req, res, next) => {
	const productBody = {
		name: req.body.name,
		slug: slugify(req.body.name),
		image: req.body.image,
		price: req.body.price,
		category: req.body.category,
		countInStock: req.body.countInStock,
		rating: 0,
		numReviews: 0,
		summary: req.body.summary,
		description: req.body.description,
		createdBy: req?.user?._id || '64c0d9fc4ac6a7c4f3bb024f',
	};

	//   Add product
	try {
		const product = await Product.create(productBody);
		successResponse(res, { statusCode: 201, data: product });
	} catch (error) {
		console.log(error);
		imagekit.deleteFile(req.uploadedFile.fileId, function (error, result) {
			if (error) {
				console.log(error);
			} else {
				console.log(result);
			}
		});
		errorResponse(res, { errorObj: error });
	}
};

// @desc      Update Product
// @route     PATCH /api/v1/products/:id
// @access    Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
	const productBody = {
		...req.body,
		updatedBy: req?.user?._id || '64c0d9fc4ac6a7c4f3bb024f',
	};

	if (req.body.name) {
		productBody.slug = slugify(req.body.name);
	}
	//   Add product
	const product = await Product.findByIdAndUpdate(req.params.id, productBody, {
		new: true,
	});

	successResponse(res, {
		data: product,
	});
});
// @desc      Review Product
// @route     POST /api/v1/products/:id/reviews
// @access    Private
exports.reviewProduct = async (req, res, next) => {
	const productId = req.params.id;
	const product = await Product.findById(productId);
	if (!product) {
		throw createError(404, 'Product not found');
	}
	const review = {
		user: req.user,
		rating: Number(req.body.rating),
		comment: req.body.comment,
	};
	product.reviews.push(review);
	product.numReviews = product.reviews.length;
	product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
	const updatedProduct = await product.save();

	successResponse(res, {
		statusCode: 2001,
		data: {
			message: 'Review success',
			review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
			numReviews: product.numReviews,
			rating: product.rating,
		},
	});
};
