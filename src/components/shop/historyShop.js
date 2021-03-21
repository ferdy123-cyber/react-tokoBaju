import { Link } from "react-router-dom";
import UserManage from "../user-manage";
import "../shop/style.css";
import axios from "axios";
import { useEffect } from "react";
import { connect } from "react-redux";

const History = ({ getTransaction, transaction }) => {
  useEffect(() => {
    getTransaction();
  }, [getTransaction]);
  const logedIn = localStorage.getItem("login");
  return (
    <div>
      <nav class=" navProduct navbar navbar-expand-lg navbar-light bg-light shadow-none p-3 mb-5 bg-light rounded fixed-top">
        <div class="container-fluid">
          <p class="navbar-brand user">
            {logedIn === "true" && <UserManage />}
            {logedIn === "false" && ""}
          </p>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to="/">
                  <p class="nav-link" aria-current="page">
                    Home
                  </p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/shop">
                  <p class="nav-link">Shop</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="tmrgin list-group">
        {transaction &&
          transaction.map((e) => {
            return (
              <div class="minmrgn list-group-item list-group-item-action shadow-sm p-3 mb-5 bg-body rounded">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">
                    IDR{" "}
                    {e.total_payment
                      .toString()
                      .split("")
                      .reverse()
                      .join("")
                      .match(/\d{1,3}/g)
                      .join(".")
                      .split("")
                      .reverse()
                      .join("")}
                  </h5>
                  <p class="text-muted">
                    {e.status === "Paid" && <p className="green">{e.status}</p>}
                    {e.status === "Pending" && (
                      <p className="red">{e.status}</p>
                    )}
                  </p>
                </div>
                <p class="mb-1">{e.orders.length} items</p>
                <small class="text-muted">{e.updatedAt}</small>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const mapStatetoProps = (props) => {
  return {
    transaction: props.product.transaction,
  };
};

const mapDispatchtoProps = (dispatch) => ({
  getTransaction: () =>
    axios
      .get("http://localhost:8000/transaction", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) =>
        dispatch({
          type: "GET_TRANSACTION",
          value: response.data.data,
        })
      ),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(History);
