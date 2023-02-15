import React, { Fragment, useEffect, useState } from "react";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import ProductCard from "../Product/ProductCard";
import "./Products.css";
import ErrorAlert from "../Alert/ErrorAlert";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const Products = () => {
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    productsCount,
    resultsPerPage,
  } = useSelector((state) => state.products);
  let count = 0;
  if (resultsPerPage < productsCount) {
    count = Math.round(productsCount / resultsPerPage);
  } else {
    count = 1;
  }
  const [price, setPrice] = React.useState([0, 200000]);

  const priceHandler = (event, newPrice) => {
    event.preventDefault();
    setPrice(newPrice);
  };
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price));
  }, [dispatch, error, keyword, currentPage, price]);

  
  const setCurrentPageNo = (e) => {
    setCurrentPage(Number(e.target.innerText));
  };
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
              <h2 className="productsHeading">Products</h2>
              <div className="products">
                {products &&
                  products.map((product) => (
                    <ProductCard product={product} key={product._id} />
                  ))}
              </div>
              <div className="filterBox">
                <Box>
                  <Typography sx={{ color: "#CB997E" }}>Price</Typography>
                  <Slider
                    getAriaLabel={() => "Price Filter"}
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000000}
                    sx={{ color: "#CB997E" }}
                    size="small"
                  />
                </Box>
              </div>
              <div className="pagination">
                <Pagination
                  count={count ? count : 10}
                  page={currentPage}
                  onChange={setCurrentPageNo}
                />
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
