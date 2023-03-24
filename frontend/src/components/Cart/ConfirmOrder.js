import React, { Fragment } from "react";
import CheckOutSteps from "./CheckOutSteps.js";
import { useSelector, useDispatch } from "react-redux";
import "./ConfirmOrder.css";
// import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import CartItemCard from "./CartItemCard.js";
import { removeItemsFromCart } from "../../actions/cartAction.js";

const ConfirmOrder = () => {
  document.title = `Confirm Order | Daintree`;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user, loading } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.pinCode}, ${shippingInfo.state},  ${shippingInfo.country}`;

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <CheckOutSteps activeStep={1} />
          <div className="confirmOrderPage">
            <div>
              <div className="confirmshippingArea">
                <Typography>Shipping Info</Typography>
                <div className="confirmshippingAreaBox">
                  <div>
                    <p>Name:</p>
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{shippingInfo.mobileNumber}</span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>{address}</span>
                  </div>
                </div>
              </div>
              <div className="confirmCartItems">
                <Typography>Your Cart Items:</Typography>
                <div className="cartPage2">
                  <div className="cartHeader2">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>SubTotal</p>
                  </div>
                  {cartItems &&
                    cartItems.map((item) => (
                      <div className="cartContainer2" key={item.product}>
                        <CartItemCard
                          item={item}
                          deleteCartItems={deleteCartItems}
                        />
                        <div className="cartInput2">
                          <input type="number" readOnly value={item.quantity} />
                        </div>
                        <p className="cartSubtotal2">{`₹${
                          item.price * item.quantity
                        }`}</p>
                      </div>
                    ))}
                  <div className="cartGrossTotal2">
                    <div></div>
                    <div className="cartGrossTotalBox2">
                      <p>Gross Total</p>
                      <p>{`₹${cartItems.reduce(
                        (grossTotal, item) =>
                          grossTotal + item.quantity * item.price,
                        0
                      )}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <div>
              <div className="orderSummary">
                <Typography>Order Summery</Typography>
                <div>
                  <div>
                    <p>Subtotal:</p>
                    <span>₹{subtotal}</span>
                  </div>
                  <div>
                    <p>Shipping Charges:</p>
                    <span>₹{shippingCharges}</span>
                  </div>
                  <div>
                    <p>GST:</p>
                    <span>₹{tax}</span>
                  </div>
                </div>

                <div className="orderSummaryTotal">
                  <p>
                    <b>Total:</b>
                  </p>
                  <span>₹{totalPrice}</span>
                </div>

                <button onClick={proceedToPayment}>Proceed To Payment</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ConfirmOrder;
