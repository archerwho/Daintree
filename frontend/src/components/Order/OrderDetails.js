import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../Loader/Loader";
import { useAlert } from "@blaumaus/react-alert";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import CartItemCard from "../Cart/CartItemCard";

const OrderDetails = ({ match }) => {
  document.title = `Order Details | Daintree`;
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order# {order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>
                    {order.user &&
                      `${order.user.firstName} ${order.user.lastName}`}
                  </span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.mobileNumber}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Status:</p>
                  <span
                    style={{
                      color:
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "green"
                          : "red",
                    }}
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </span>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>₹ {order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Details:</p>
                  <span
                    style={{
                      color:
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "green"
                          : "red",
                    }}
                  >
                    {order.orderStatus && order.orderStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="cartPage3">
                <div className="cartHeader3">
                  <p>Product</p>
                  <p>Quantity</p>
                  <p>SubTotal</p>
                </div>
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div className="cartContainer3" key={item.product}>
                      <CartItemCard item={item} />
                      <div className="cartInput3">
                        <input type="number" readOnly value={item.quantity} />
                      </div>
                      <p className="cartSubtotal3">{`₹${
                        item.price * item.quantity
                      }`}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
