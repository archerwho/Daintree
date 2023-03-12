import React, { Fragment, useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import "./Home.css";
import ProductCard from "../Product/ProductCard";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import NewAlert from "../Alert/NewAlert";
import Loader from "../Loader/Loader";

function Home() {
  document.title = "Daintree | Online Store";
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    //, productsCount
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <Fragment>
      {error ? (
        <NewAlert error={error} />
      ) : (
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
                    Let's Get Shopping...{" "}
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
      )}
    </Fragment>
  );
}

export default Home;
