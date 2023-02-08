import React, { Fragment, useEffect } from "react";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import ProductCard from "../Product/ProductCard";
import "./Products.css";
import ErrorAlert from "../Alert/ErrorAlert";
import { useParams } from "react-router-dom";
// import { Pagination } from "@mui/material";

const Products = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } =
  // , productsCount, resultsPerPage
    useSelector((state) => state.products);
  // const count = Math.floor(productsCount / resultsPerPage) + 1
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword));
  }, [dispatch, error, keyword]);

  // const [currentPage, setCurrentPage] = useState(1);

  // const setCurrentPageNo = (e) => {
  //   setCurrentPage(Number(e.target.innerText));
  // };
  return (
    <Fragment>
      {error ? (
        <ErrorAlert error={error} />
      ) : (
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <h2 className="productsHeading">Products</h2>
              <div className="products">
                {products &&
                  products.map((product) => (
                    <ProductCard product={product} key={product._id} />
                  ))}
              </div>
              {/* <div className="pagination">
                <Pagination
                  count={count ? count : 10}
                  page={currentPage}
                  onChange={setCurrentPageNo}
                />
              </div> */}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
