const express = require(`express`);
const {
  getAllProducts,
  updateProduct,
  deleteProduct,
  addProduct,
  getProductDetails,
} = require(`../controllers/productController`);
const { isAuthenticatedUser, authorizedUser } = require("../middleware/authentication");
const router = express.Router();

router.route(`/products`).get(getAllProducts);

router.route(`/product/new`).post(isAuthenticatedUser, authorizedUser(`admin`), addProduct);

router
  .route(`/product/:id`)
  .put(isAuthenticatedUser, authorizedUser(`admin`), updateProduct)
  .delete(isAuthenticatedUser, authorizedUser(`admin`), deleteProduct)
  .get(getProductDetails);

module.exports = router;
