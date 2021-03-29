import { Link } from "react-router-dom";
import shop from "../../img/shop.png";
import "../admin/style.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import UserNavbar from "../navbar/usernavbar";

const AdminPage = ({ data, getProduct, allTransaction, getAllTransaction }) => {
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  useEffect(() => {
    getAllTransaction();
  }, [getAllTransaction]);

  console.log(data);
  console.log(allTransaction);
  const newOrder = allTransaction.filter((e) => e.status === "Paid");
  const orderComplete = allTransaction.filter((e) => e.status === "Success");
  const orderComplain = allTransaction.filter((e) => e.status === "Canceling");
  const orderCanceled = allTransaction.filter((e) => e.status === "Canceled");
  const saldo = orderComplete
    .map((e) => e.total_payment)
    .reduce((a, b) => a + b, 0);
  const userName = localStorage.getItem("name");
  return (
    <div className="down">
      <UserNavbar />
      <div className="ed1 row d-flex justify-content-center">
        <div className="user2 col-4 shadow-sm p-3 mb-5 bg-body rounded ">
          <div className="storename">
            <div className="userIcon">
              <img src={shop} width="30px" height="30px" alt="shop" />
              <span>{userName}'s store</span>
            </div>
            <div className="row">
              <p className="saldo fs-6 col-5">Balance</p>
              <p className="value fs-6 col-5">
                IDR{" "}
                {saldo
                  .toString()
                  .split("")
                  .reverse()
                  .join("")
                  .match(/\d{1,3}/g)
                  .join(".")
                  .split("")
                  .reverse()
                  .join("")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="user2 col-2 shadow-sm p-3 mb-5 bg-body rounded ">
          <div className="storename">
            <div className="userIcon">
              <span>New orders</span>
            </div>
            <div className="row d-flex justify-content-center">
              <a href="/seller/new-order" className="new">
                {newOrder.length}
              </a>
            </div>
          </div>
        </div>
        <div className="user2 col-2 shadow-sm p-3 mb-5 bg-body rounded ">
          <div className="storename">
            <div className="userIcon">
              <span>Orders complain</span>
            </div>
            <div className="row d-flex justify-content-center">
              <a href="seller/complain-order" className="new">
                {orderComplain.length}
              </a>
            </div>
          </div>
        </div>
        <div className="user2 col-2 shadow-sm p-3 mb-5 bg-body rounded ">
          <div className="storename">
            <div className="userIcon">
              <span>Orders complete</span>
            </div>
            <div className="row d-flex justify-content-center">
              <a href="seller/order-complete" className="new">
                {orderComplete.length}
              </a>
            </div>
          </div>
        </div>
        <div className="user2 col-2 shadow-sm p-3 mb-5 bg-body rounded ">
          <div className="storename">
            <div className="userIcon">
              <span>Your product</span>
            </div>
            <div className="row d-flex justify-content-center">
              <Link to="seller/my-product">
                <p className="new">{data.length}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="user2 col-2 shadow-sm p-3 mb-5 bg-body rounded ">
          <div className="storename">
            <div className="userIcon">
              <span>Add product</span>
            </div>
            <Link to="seller/add-product">
              <div className="row d-flex justify-content-center">
                <p className="new">+</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStatetoProps = (props) => {
  return {
    data: props.product.data,
    allTransaction: props.product.allTransaction,
  };
};

const mapDispatchtoProps = (dispatch) => ({
  getProduct: () =>
    axios.get("http://localhost:8000/product").then((response) =>
      dispatch({
        type: "GET_PRODUCT",
        value: response.data.data,
      })
    ),

  getAllTransaction: () =>
    axios
      .get("http://localhost:8000/transaction/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) =>
        dispatch({
          type: "ALL_TRANSACTION",
          value: response.data.data,
        })
      )
      .catch((err) => {
        alert(err.response.data.message);
      }),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(AdminPage);
