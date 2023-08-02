const redis = require("redis");

const Category = require("../models/Category");
const slugify = require("slugify");
const shortid = require("shortid");
const { successResponse } = require("../utils/sendResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const logger = require("../utils/logger");

// const client = redis.createClient();

// client.connect().then(() => {
//   logger.log("info", "Connected to redis");
// });

// ****** Create Category List With Children For Parent Category ****** //
function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      ...cate,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

// middleware for category caching on get request
const categoryCache = asyncHandler(async (req, res, next) => {
  // const categories = await client.get("categories");
  let categories = undefined;
  if (categories) {
    successResponse(res, {
      data: JSON.parse(categories),
    });
    return;
  }

  next();
});
// @desc      Get categories
// @route     GET /api/categories/
// @access    Public
const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).lean();

  if (categories.length === 0) {
    return next(createError(404, "No categories found"));
  }

  const categoryList = createCategories(categories);

  // cache categories in redis
  // client.set("categories", JSON.stringify(categoryList));

  successResponse(res, {
    data: categoryList,
  });
});

// @desc      Add category
// @route     POST /api/categories/
// @access    Private [super-admin]

const addCategory = asyncHandler(async (req, res, next) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  //   if (req.file) {
  //     categoryObj.categoryImage = "/public/" + req.file.filename;
  //   }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const category = await Category.create(categoryObj);
  // client.del("categories");
  successResponse(res, {
    statusCode: 201,
    data: category,
  });
});

module.exports = { addCategory, getCategories, categoryCache };
