import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import Loader from "../Loader/Loader";
import { useAlert } from "@blaumaus/react-alert";
import "./ProductDetails.css";
import Carousel from "../Carousel/Carousel";
import Stars from "../Rating/Stars";
import ReviewCard from "./ReviewCard.js";
import "./ReviewCard.css";
import { addItemsToCart } from "../../actions/cartAction";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity === 1) return;
    return setQuantity(quantity - 1);
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added to the Cart.");
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);
  document.title = `${product.name} | Daintree`;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <div className="ProductImages">
              {product.images && <Carousel images={product.images} />}
            </div>
            <div className="ProductInformation">
              <div className="DetailsBlock-1">
                <h2>{product.name}</h2>

                <p>{`Product ID - ${product._id}`}</p>
              </div>
              <div className="DetailsBlock-2">
                <Stars
                  stars={product.averageRating}
                  review={product.numberOfReviews}
                />
              </div>
              <div className="DetailsBlock-3">
                <h1>{`₹ ${product.price}`}</h1>
                <div className="DetailsBlock-3-1">
                  <div className="DetailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "Out of Stock" : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="DetailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button className="SubmitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="ReviewsHeading">Reviews</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard review={review} key={review.createdBy} />
                ))}
            </div>
          ) : (
            <p className="NoReviews">No Reviews Yet!</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
