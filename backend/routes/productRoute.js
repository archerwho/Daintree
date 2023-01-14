const express = require(`express`);
const {
  getAllProducts,
  updateProduct,
  deleteProduct,
  addProduct,
  getProductDetails,
} = require(`../controllers/productController`);
const { isAuthenticatedUser } = require("../middleware/authentication");
const router = express.Router();

router.route(`/products`).get(getAllProducts);

router.route(`/product/new`).post(isAuthenticatedUser, addProduct);

router
  .route(`/product/:id`)
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductDetails);

module.exports = router;
