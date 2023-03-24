import React from "react";
import "./AdminDashboard.css";
import Sidebar from "./Sidebar";
import Widget from "./Widget";
import Featured from "./Featured";
import Chart from "./Chart";
import Table from "./Table";


const AdminDashboard = () => {
  document.title = `Admin Dashboard | Daintree`;

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
