import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ErrorAlert from "../layout/Alert/ErrorAlert";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  
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
                  {product.images &&
                    product.images.map((image, index) => (
                      <img
                        src={image.url}
                        alt={`ProductImage ${index}`}
                        className="imageSlide"
                        key={image._id}
                        
                      />
                    ))}
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
