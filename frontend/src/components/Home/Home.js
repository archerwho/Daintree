import React, { Fragment, useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import "./Home.css";
import ProductCard from "../Product/ProductCard";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "@blaumaus/react-alert";
import Loader from "../Loader/Loader";

function Home() {
  document.title = "Daintree | Online Store";
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProduct());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="banner">
              <p>Welcome to Daintree</p>
              <h1>Find Awesome Products Below...</h1>
              <a href="#featuredproducts">
                <IconButton sx={{ color: "#cb997e" }}>
                  Let's Get Shopping...
                  <ArrowForwardIcon
                    sx={{ flexGrow: 0.5, color: "#cb997e", font: "30px" }}
                  />
                </IconButton>
              </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="featuredproducts" id="featuredproducts">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
          <br />
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
