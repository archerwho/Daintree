import React, { Fragment } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import "./Home.css";
import Product from "./product.js";

const product = {
  name: "Arrow T-shirt",
  price: "$300",
  _id: "archer",
  images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
};

const Home = (
  <Fragment>
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
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />

      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
    </div>
    <br />
  </Fragment>
);

export default Home;
