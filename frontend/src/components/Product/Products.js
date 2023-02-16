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

const categories = [
  "TV & Laptops",
  "Footwear",
  "Fashion",
  "Cameras",
  "Mobilephones",
  "Mobile Accessories",
  "Kitchen",
  "Apps & Games",
  "Books",
  "Beauty",
  "Baby Products",
  "Electronics",
  "Cars",
  "Home Furnitures",
];

const Products = () => {
  document.title = "Products | Daintree"
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = React.useState([0, 300000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    // productsCount,
    resultsPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  let count = 0;
  if (resultsPerPage < filteredProductsCount) {
    count = Math.ceil(filteredProductsCount / resultsPerPage);
  } else {
    count = 1;
  }

  const priceHandler = (event, newPrice) => {
    event.preventDefault();
    setPrice(newPrice);
  };
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, rating));
  }, [dispatch, error, keyword, currentPage, price, category, rating]);

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
                <Typography sx={{ color: "#CB997E" }}>Price</Typography>
                <Slider
                  getAriaLabel={() => "Price Filter"}
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  min={0}
                  max={300000}
                  step={20000}
                  sx={{ color: "#CB997E" }}
                  size="small"
                />
                <Typography sx={{ color: "#CB997E" }}>Categories</Typography>
                <ul className="categoryBox">
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
                <fieldset
                  style={{
                    color: "rgb(203, 153, 126, 1)",
                    padding: "0.2vmax 0.8vmax",
                    border: "2px solid rgb(203, 153, 126, 0.5)",
                  }}
                >
                  <Typography component="legend">Ratings Above</Typography>
                  <Slider
                    value={rating}
                    onChange={(e, newRating) => setRating(newRating)}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                    step={0.5}
                    sx={{ color: "#CB997E" }}
                    size="small"
                  />
                </fieldset>
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
