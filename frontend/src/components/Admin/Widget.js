import "./Widget.css";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
// import InventoryIcon from "@mui/icons-material/Inventory";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { useEffect } from "react";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";

const Widget = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const { orders, totalAmount } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  let delivered = 0;
  orders &&
    orders.forEach((order) => {
      if (order.orderStatus === "Delivered") {
        delivered += 1;
      }
    });

  const shipped =
    orders && orders.filter((order) => order.orderStatus === "Shipped").length;
  const processing =
    orders && orders.filter((order) => order.orderStatus === "Proccessing").length;

  let data;
  switch (props.type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        number: users && users.length,
        route: "/admin/users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        number: orders && orders.length,
        route: "/admin/orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "products":
      data = {
        title: "PRODUCTS",
        isMoney: false,
        link: "See details",
        number: products && products.length,
        route: "/admin/products",
        icon: (
          <StoreIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "productOutOfStock":
      data = {
        title: "PRODUCTS OUT-OF-STOCK",
        isMoney: false,
        link: "",
        number: outOfStock,
        // icon: (
        //   <InventoryIcon
        //     className="icon"
        //     style={{
        //       backgroundColor: "rgba(255, 0, 0, 0.3)",
        //       color: "red",
        //     }}
        //   />
        // ),
      };
      break;
    case "productInStock":
      data = {
        title: "PRODUCTS IN-STOCK",
        isMoney: false,
        link: "",
        number: products && products.length - outOfStock,
        // diff: Math.floor((outOfStock / products.length) * 100),
        // icon: (
        //   <InventoryIcon
        //     className="icon"
        //     style={{
        //       backgroundColor: "rgba(0, 128, 0, 0.3)",
        //       color: "green",
        //     }}
        //   />
        // ),
      };
      break;
    case "delivered":
      data = {
        title: "ORDERS DELIVERED",
        isMoney: false,
        number: delivered ? delivered : "0",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "green",
            }}
          />
        ),
      };
      break;
    case "proccessing":
      data = {
        title: "ORDERS IN PROCESSING",
        isMoney: false,
        number: processing ? processing : "0",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "red",
            }}
          />
        ),
      };
      break;
    case "shipped":
      data = {
        title: "ORDERS SHIPPED",
        isMoney: false,
        number: shipped ? shipped : "0",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "orange",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "₹"} {data.number ? data.number : totalAmount}
        </span>
        <span className="link" onClick={() => navigate(data.route)}>
          {data.link}
        </span>
      </div>
      <div className="right">
        {/* <div
          className={
            data.diff < 40 ? "percentage positive" : "percentage negative"
          }
        >
          <KeyboardArrowUpIcon />{data.diff}%
        </div> */}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
