const express = require(`express`);
const {
  newOrder,
  getOrderDetails,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const {
  isAuthenticatedUser,
  authorizedUser,
} = require("../middleware/authentication");

const router = express.Router();

router.route(`/order/new`).post(isAuthenticatedUser, newOrder);
router.route(`/order/:id`).get(isAuthenticatedUser, getOrderDetails);
router.route(`/orders/myorders`).get(isAuthenticatedUser, myOrders);
router
  .route(`/admin/orders`)
  .get(isAuthenticatedUser, authorizedUser(`admin`), getAllOrders);
router
  .route(`/admin/order/:id`)
  .put(isAuthenticatedUser, authorizedUser(`admin`), updateOrder)
  .delete(isAuthenticatedUser, authorizedUser(`admin`), deleteOrder);

module.exports = router;
