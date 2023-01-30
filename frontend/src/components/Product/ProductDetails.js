import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../actions/productAction";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
  const { product, loading } = useSelector((state) => state.productDetails);

  return (
    <Fragment>
      <div className="ProductDetails">
        {product.images &&
          product.images.map((image, index) =>( 
            <img
              src={image.url}
              alt={`ProductImage ${index}`}
              className="imageSlide"
              key={image._id}
            />
          ))}
      </div>
    </Fragment>
  );
};

export default ProductDetails;
