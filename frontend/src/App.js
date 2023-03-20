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
import About from "./components/About/About.js";
import { clearErrors } from "./actions/productAction";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import AllOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
// import AdminDashBoard from "./components/Admin/AdminDashboard"
import ADash from "./components/Admin/ADash";
import ProductList from "./components/Admin/ProductList"
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrdersList from "./components/Admin/OrdersList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import ProductReviews from "./components/Admin/ProductReview";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";

function App() {
  const [stripeApiKey, setStripeApiKey] = React.useState("");
  async function getStripeApiKey() {
    try {
      const { data } = await axios.get(`/api/v1/stripeapikey`);
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    Webfont.load({
      google: {
        families: ["Montserrat", "sans-serif"],
      },
    });
    store.dispatch(loadUser());
    setTimeout(() => {
      store.dispatch(clearErrors());
    }, 3000);
    getStripeApiKey();
  });
  return (
    <Router>
      <Header />
      <div style={{ width: "100%", minHeight: "70vh", backgroundColor:"#eee" }}>
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
          <Route
            exaxt
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route exaxt path="/cart" element={<Cart />} />
          <Route exaxt path="/about" element={<About />} />
          <Route
            exact
            path="/shipping"
            element={
              <ProtectedRoute redirectTo="/login">
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/order/confirm"
            element={
              <ProtectedRoute redirectTo="/login">
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/process/payment"
            element={
              stripeApiKey && (
                <ProtectedRoute redirectTo="/login">
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                </ProtectedRoute>
              )
            }
          />
          <Route
            exact
            path="/success"
            element={
              <ProtectedRoute redirectTo="/login">
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/orders/myorders"
            element={
              <ProtectedRoute redirectTo="/login">
                <AllOrders />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/order/:id"
            element={
              <ProtectedRoute redirectTo="/login">
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          {/* <Route
            exact
            path="/admin/dashboard"
            element={
              <ProtectedRoute redirectTo="/login">
                <AdminDashBoard />
              </ProtectedRoute>
            }
          /> */}
          <Route
            exact
            path="/admin/dashboard"
            element={
              <ProtectedRoute  redirectTo="/login"> 
                <ADash />
              </ProtectedRoute>
            } //Anybody can access this route (bug)
          />
          <Route
            exact
            path="/admin/products"
            element={
              <ProtectedRoute  redirectTo="/login"> 
                <ProductList />
              </ProtectedRoute>
            } //Anybody can access this route (bug)
          />
          <Route
            exact
            path="/admin/product"
            element={
              <ProtectedRoute  redirectTo="/login"> 
                <NewProduct />
              </ProtectedRoute>
            } //Anybody can access this route (bug)
          />
          <Route
            exact
            path="/admin/product/:id"
            element={
              <ProtectedRoute  redirectTo="/login"> 
                <UpdateProduct />
              </ProtectedRoute>
            } //Anybody can access this route (bug)
          />
          <Route
            exact
            path="/admin/orders"
            element={
              <ProtectedRoute  redirectTo="/login"> 
                <OrdersList />
              </ProtectedRoute>
            } //Anybody can access this route (bug)
          />
          <Route
            exact
            path="/admin/order/:id"
            element={
              <ProtectedRoute  redirectTo="/login"> 
                <ProcessOrder />
              </ProtectedRoute>
            } //Anybody can access this route (bug)
          />
          <Route
            exact
            path="/admin/reviews"
            element={
              <ProtectedRoute  redirectTo="/login"> 
                <ProductReviews />
              </ProtectedRoute>
            } //Anybody can access this route (bug)
          />
          <Route
            exact
            path="/admin/users"
            element={
              <ProtectedRoute  redirectTo="/login"> 
                <UsersList />
              </ProtectedRoute>
            } //Anybody can access this route (bug)
          />
          <Route
            exact
            path="/admin/user/:id"
            element={
              <ProtectedRoute  redirectTo="/login"> 
                <UpdateUser />
              </ProtectedRoute>
            } //Anybody can access this route (bug)
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
