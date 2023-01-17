const Order = require("../models/orderModel");
const Product = require(`../models/productModel`);
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require(`../middleware/catchAsyncErrors`);

//creating new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidOn: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: `Order Successful`,
    order,
  });
});

// Get specific order details -- Logged In user
exports.getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    `user`,
    `firstName lastName email mobileNumber`
  );

  if (!order) {
    return next(new ErrorHandler(`Order Not Found.`, 404));
  }

  res.status(201).json({
    success: true,
    order,
  });
});

// Get all order details -- Logged In user
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders) {
    return next(new ErrorHandler(`No Orders yet by this user.`, 404));
  }

  res.status(201).json({
    success: true,
    orders,
  });
});

// Get all order details -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  if (!orders) {
    return next(new ErrorHandler(`No Orders yet.`, 404));
  }

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount = totalAmount + order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(`No Orders yet.`, 404));
  }

  if (order.orderStatus === `Delivered`) {
    return next(new ErrorHandler(`Order already Delivered.`, 400));
  }

  order.orderItems.forEach(async (ord) => {
    await updateStock(ord.product, ord.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === `Delivered`) {
    order.deliveredOn = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(`No Orders yet.`, 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
    message: `Order Deleted.`,
  });
});
