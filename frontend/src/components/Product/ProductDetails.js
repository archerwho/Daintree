import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import Loader from "../Loader/Loader";
import ErrorAlert from "../Alert/ErrorAlert";
import "./ProductDetails.css";
import Carousel from "../Carousel/Carousel";
import Stars from "../Rating/Stars";
import ReviewCard from "./ReviewCard.js";
import "./ReviewCard.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);

  return (
    <Fragment>
      {error ? (
        <ErrorAlert error={error} />
      ) : (
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
                        <button>-</button>
                        <input type="number" value="1" readOnly />
                        <button>+</button>
                      </div>
                      <button>Add to Cart</button>
                    </div>
                    <p>
                      Status:{" "}
                      <b
                        className={
                          product.stock < 1 ? "redColor" : "greenColor"
                        }
                      >
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
      )}
    </Fragment>
  );
};

export default ProductDetails;
