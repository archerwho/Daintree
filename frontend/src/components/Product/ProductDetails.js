import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import Loader from "../Loader/Loader";
import { useAlert } from "@blaumaus/react-alert";
import "./ProductDetails.css";
import Carousel from "../Carousel/Carousel";
import Stars from "../Rating/Stars";
import ReviewCard from "./ReviewCard.js";
import "./ReviewCard.css";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
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
  const sumbitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    const reviewform = new FormData();
    reviewform.set("rating", rating);
    reviewform.set("comment", comment);
    reviewform.set("productId", id);
    dispatch(newReview(reviewform));
    setOpen(false);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully.");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);
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
                <h1>
                  <span>MRP:&nbsp;</span>
                  <span>₹&nbsp;</span>
                  {`${product.price}`}
                </h1>
                <div className="DetailsBlock-3-1">
                  <div className="DetailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock === 0 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:&nbsp;
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "Out of Stock" : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="DetailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button onClick={sumbitReviewToggle} className="SubmitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="ReviewsHeading">Reviews</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={sumbitReviewToggle}
            fullWidth
          >
            <DialogTitle sx={{ font: "600 2rem Montserrat", color: "#CB997E" }}>
              Submit a Review!
            </DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={Number(rating)}
                precision={0.5}
                sx={{ color: "#CB997E" }}
              />
              <textarea
                className="submitDialogTextArea"
                col="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button color="error" onClick={sumbitReviewToggle}>
                Cancel
              </Button>
              <Button color="success" onClick={reviewSubmitHandler}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
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
