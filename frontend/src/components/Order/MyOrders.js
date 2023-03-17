import React, { Fragment, useEffect } from "react";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@blaumaus/react-alert";
import LaunchIcon from "@mui/icons-material/Launch";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  document.title = `${user.firstName}'s orders | Daintree`;

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      type: "string",
      flex: 0.5,
      cellClassName: (params) =>
        params.row.status === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return <LaunchIcon onClick={() => navigate(`/order/${params.id}`)} />;
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <Typography id="myOrdersHeading">Your Orders</Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            autoHeight
            className="myOrdersTable"
          />
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
