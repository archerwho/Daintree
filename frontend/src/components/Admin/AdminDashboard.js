// import React, { useEffect } from "react";
// import Sidebar from "./Sidebar";
// import { Typography } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { getAdminProduct } from "../../actions/productAction";
// import { getAllOrders } from "../../actions/orderAction.js";
// import { getAllUsers } from "../../actions/userAction.js";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   document.title = `Admin Dashboard | Daintree`;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { products } = useSelector((state) => state.products);
//   const { orders } = useSelector((state) => state.allOrders);
//   const { users } = useSelector((state) => state.allUsers);

//   // let outOfStock = 0;

//   // products &&
//   //   products.forEach((item) => {
//   //     if (item.Stock === 0) {
//   //       outOfStock += 1;
//   //     }
//   //   });

//   useEffect(() => {
//     dispatch(getAdminProduct());
//     dispatch(getAllOrders());
//     dispatch(getAllUsers());
//   }, [dispatch]);

//   let totalAmount = 0;
//   orders &&
//     orders.forEach((item) => {
//       totalAmount += item.totalPrice;
//     });

//   //   const lineState = {
//   //     labels: ["Initial Amount", "Amount Earned"],
//   //     datasets: [
//   //       {
//   //         label: "TOTAL AMOUNT",
//   //         backgroundColor: ["tomato"],
//   //         hoverBackgroundColor: ["rgb(197, 72, 49)"],
//   //         data: [0, totalAmount],
//   //       },
//   //     ],
//   //   };

//   //   const doughnutState = {
//   //     labels: ["Out of Stock", "InStock"],
//   //     datasets: [
//   //       {
//   //         backgroundColor: ["#00A6B4", "#6800B4"],
//   //         hoverBackgroundColor: ["#4B5000", "#35014F"],
//   //         data: [outOfStock, products.length - outOfStock],
//   //       },
//   //     ],
//   //   };

//   return (
//     <div className="dashboard">
//       {/* <AdminSidebar /> */}
//       <Sidebar />
//       <div className="dashboardContainer">
//         <Typography component="h1">Dashboard</Typography>

//         <div className="dashboardSummary">
//           <div>
//             <p>
//               Total Amount <br /> ₹{totalAmount}
//             </p>
//           </div>
//           <div className="dashboardSummaryBox2">
//             <h3 onClick={() => navigate("/admin/products")}>
//               <p>Product</p>
//               <p>{products && products.length}</p>
//             </h3>
//             <h3 onClick={() => navigate("/admin/orders")}>
//               <p>Orders</p>
//               <p>{orders && orders.length}</p>
//             </h3>
//             <h3 onClick={() => navigate("/admin/users")}>
//               <p>Users</p>
//               <p>{users && users.length}</p>
//             </h3>
//           </div>
//         </div>

//         <div className="lineChart">{/* <Line data={lineState} /> */}</div>

//         <div className="doughnutChart">
//           {/* <Doughnut data={doughnutState} /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
