import "./App.css";
import Footer from "./components/layout/Footer/footer";
import Header from "./components/layout/Header/Header";
import Webfont from "webfontloader";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import LoginRegister from "./components/User/LoginRegister";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserProfile from "./components/User/UserProfile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import About from "./components/About/About.js"

function App() {
  React.useEffect(() => {
    Webfont.load({
      google: {
        families: ["Montserrat", "sans-serif"],
      },
    });
    store.dispatch(loadUser());
  });
  return (
    <Router>
      <Header />
      <div style={{ width: "100%", minHeight: "70vh" }}>
        <Routes>
          <Route exaxt path="/" element={<Home />} />
          <Route exaxt path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exaxt path="/login" element={<LoginRegister />} />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute redirectTo="/login">
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/profile/update"
            element={
              <ProtectedRoute redirectTo="/login">
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/password/update"
            element={
              <ProtectedRoute redirectTo="/login">
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route exaxt path="/password/forgot" element={<ForgotPassword />} />
          <Route exaxt path="/password/reset/:token" element={<ResetPassword />} />
          <Route exaxt path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
