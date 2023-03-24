import React, { Fragment, useEffect } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@blaumaus/react-alert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import Widget from "./Widget";

const ProductList = () => {
  const dispatch = useDispatch();
  document.title = `All Products | ADMIN`;
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 250, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "reviews",
      headerName: "Reviews",
      type: "string",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "string",
      minWidth: 120,
      flex: 0.3,
      cellClassName: (params) =>
        params.row.stock === "Out of Stock" ? "redColor" : "greenColor",
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <EditIcon onClick={() => navigate(`/admin/product/${params.id}`)} />
            <DeleteIcon
              onClick={() => deleteProductHandler(params.id)}
            ></DeleteIcon>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock === 0 ? "Out of Stock" : item.stock,
        price: item.price,
        name: item.name,
        reviews: item.reviews.length,
      });
    });

  return (
    <Fragment>
      <div className="home">
        <SideBar />
        <div className="homeContainer productListContainer">
          {/* <h1 id="productListHeading">ALL PRODUCTS</h1> */}
          <div className="productListWidget">
            <Widget type="productOutOfStock" />
            <Widget type="productInStock" />
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
