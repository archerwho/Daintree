import React, { Fragment, useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import "./Home.css";
import Product from "./product.js";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux"; //
import Loader from "../layout/Loader/Loader";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

function Home() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    //, productsCount
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const [open, setOpen] = React.useState(true);
  return (
    <Fragment>
      {error ? (
        <Collapse in={open} sx={{ width: "100vmax" }}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
            severity="error"
          >
            {error}
          </Alert>
        </Collapse>
      ) : (
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title="Daintree | Online Shop" />
              <div className="banner">
                <p>Welcome to Daintree</p>
                <h1>Find Awesome Products Below...</h1>
                <a href="#container">
                  <IconButton sx={{ color: "#cb997e" }}>
                    Let's Get Shopping...{" "}
                    <ArrowForwardIcon
                      sx={{ flexGrow: 0.5, color: "#cb997e", font: "30px" }}
                    />
                  </IconButton>
                </a>
              </div>
              <h2 className="homeHeading">Featured Products</h2>
              <div className="container" id="container">
                {products &&
                  products.map((product) => (
                    <Product product={product} key={product._id} />
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
