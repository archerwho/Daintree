import React from "react";
import "./AD.css";
import Sidebar from "./Sidebar";
import Widget from "./Widget";
import Featured from "./Featured";
import Chart from "./Chart";
import Table from "./Table";
// import { useDispatch} from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getAdminProduct } from "../../actions/productAction";
// import { getAllOrders } from "../../actions/orderAction";
// import { getAllUsers } from "../../actions/userAction";

const AdminDashboard = () => {
  document.title = `Admin Dashboard | Daintree`;
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const { products } = useSelector((state) => state.products);
  // const { orders } = useSelector((state) => state.allOrders);
  // const { users } = useSelector((state) => state.allUsers);

  // useEffect(() => {
  //   dispatch(getAdminProduct());
  //   dispatch(getAllOrders());
  //   dispatch(getAllUsers());
  // }, [dispatch]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="products" />
          <Widget type="earning" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
