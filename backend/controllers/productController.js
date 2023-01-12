const Product = require(`../models/productModel`);
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require(`../middleware/catchAsyncErrors`);
const ApiFeatures = require("../utils/apifeatures");

// Find all products.
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments()
  const apiFeature = new ApiFeatures(Product.find({}), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productCount
  });
});

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(`Product Not Found`, 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Launch a product. --Admin
exports.addProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: `Product added`,
    product,
  });
});

//Update Product Details. --Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(`Product Not Found`, 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(`Product Not Found`, 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: `Product deleted from the DB.`,
  });
});
