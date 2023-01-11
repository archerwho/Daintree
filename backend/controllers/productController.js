const Product = require(`../models/productModel`);
const ErrorHandler = require("../utils/errorhandler");

// Find all products.
exports.getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(200).json({
    success: true,
    products,
  });
};

//Get Product Details
exports.getProductDetails = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(`Product Not Found`, 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};

//Launch a product. --Admin
exports.addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: `Product added`,
    product,
  });
};

//Update Product Details. --Admin
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: `Product Not Found`,
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

//Delete Product -- Admin
exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: `Product Not Found`,
    });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: `Product deleted from the DB.`,
  });
};
