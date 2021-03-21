import UserManage from "../user-manage";
import chek from "../../img/checkout.png";
import logo from "../../img/tshirt3.jpg";
import { Link, useParams } from "react-router-dom";
import "../shop/style.css";
import add from "../../img/increase.png";
import min from "../../img/decrease.png";
import { connect } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const Payment = ({
  getTransactionById,
  getTransaction,
  transaction,
  transactionById,
}) => {
  const load = () => {
    getTransaction();
  };
  console.log(transaction);
  const trscPending =
    transaction && transaction.filter((e) => e.status === "Pending");

  const linkCart = trscPending.map((e) => e.id);
  const logedIn = localStorage.getItem("login");
  useEffect(() => {
    getTransactionById(linkCart);
  }, [getTransactionById, linkCart]);
  console.log(linkCart);

  const payNow = (val) => {
    axios
      .patch("http://localhost:8000/transaction/", val, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert("success payment");
        getTransactionById(linkCart);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <nav
        onLoad={load}
        class="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 bg-body rounded fixed-top"
      >
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
      <div className="paymnt row d-flex justify-content-center ">
        <div className="shadow p-3 mb-5 bg-body rounded col-5">
          <div className="e row d-flex justify-content-center">
            <h4>Payment detail</h4>
          </div>
          <div className="e row justify-content-center">
            <h5 className="col-4">Total : </h5>
            <h5 className="prc col-6">IDR {transactionById.total_payment}</h5>
          </div>
          <div className="e row justify-content-center">
            <h5 className="col-4">Status : </h5>
            <h5 className="prc col-6">{transactionById.status}</h5>
          </div>
          <Link to="/shop">
            <div className="e row justify-content-center">
              <button
                onClick={() =>
                  payNow({
                    id: linkCart,
                  })
                }
                className="btn btn-dark col-5"
              >
                Pay now
              </button>
              <button className="btn btn-dark col-5">Go to shop</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStatetoProps = (props) => {
  return {
    transaction: props.product.transaction,
    transactionById: props.product.transactionById,
  };
};

const mapDispatchtoProps = (dispatch) => ({
  getTransactionById: (id) =>
    axios
      .get(`http://localhost:8000/transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) =>
        dispatch({
          type: "GET_TRANSACTION_byID",
          value: response.data.data,
        })
      ),
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

export default connect(mapStatetoProps, mapDispatchtoProps)(Payment);
