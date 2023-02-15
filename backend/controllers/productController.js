const Product = require(`../models/productModel`);
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require(`../middleware/catchAsyncErrors`);
const ApiFeatures = require("../utils/apifeatures");

// Find all products.
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultsPerPage = 15;
  const productsCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find({}), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultsPerPage,
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
  req.body.createdBy = req.user.id; ///*********Confirm Later*********///
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

// New Product review or update previous review
exports.productReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    createdBy: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    rating: Number(rating),
    comment: comment,
  };

  const product = await Product.findById({ _id: productId });
  const isReviewed = product.reviews.find(
    (rev) => rev.createdBy.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.createdBy.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });
  product.averageRating = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// View all reviews for a specific Product
exports.getAllProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler(`Product Not Found`, 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review from a product
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler(`Product Not Found`, 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });
  const averageRating = avg / reviews.length;
  const numberOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      averageRating,
      numberOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: `Review deleted`,
  });
});
