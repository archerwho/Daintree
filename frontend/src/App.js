import "./App.css";
import Footer from "./components/layout/Footer/footer";
import Header from "./components/layout/Header/Header";
import Webfont from "webfontloader";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products.js";
import history from "./components/layout/Header/history";
import LoginRegister from "./components/User/LoginRegister";
import store from "./store"
import { loadUser } from "./actions/userAction";
import Profile from "./components/User/Profile.js"

function App() {
  React.useEffect(() => {
    Webfont.load({
      google: {
        families: ["Montserrat", "sans-serif"],
      },
    });
    store.dispatch(loadUser())
  });
  return (
    <Router history={history}>
      <Header />
      <div style={{ width: "100%", minHeight: "70vh" }}>
        <Routes>
          <Route exaxt path="/" element={<Home />} />
          <Route exaxt path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exaxt path="/login" element={<LoginRegister />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
