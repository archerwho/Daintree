const express = require(`express`);
const {
  getAllProducts,
  updateProduct,
  deleteProduct,
  addProduct,
  getProductDetails,
  productReview,
  getAllProductReviews,
  deleteReview,
} = require(`../controllers/productController`);
const {
  isAuthenticatedUser,
  authorizedUser,
} = require("../middleware/authentication");
const router = express.Router();

router.route(`/products`).get(getAllProducts);
router
  .route(`/admin/product/new`)
  .post(isAuthenticatedUser, authorizedUser(`admin`), addProduct);
router
  .route(`/admin/product/:id`)
  .put(isAuthenticatedUser, authorizedUser(`admin`), updateProduct)
  .delete(isAuthenticatedUser, authorizedUser(`admin`), deleteProduct);
router.route(`/product/:id`).get(getProductDetails);
router.route(`/review`).put(isAuthenticatedUser, productReview);
router
  .route(`/reviews`)
  .get(getAllProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
