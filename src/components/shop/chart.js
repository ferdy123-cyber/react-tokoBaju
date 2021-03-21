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

const Chart = (props) => {
  const {
    match,
    getTransactionById,
    transactionById,
    data,
    getProduct,
  } = props;
  useEffect(() => {
    getTransactionById(match.params.id);
  }, [getTransactionById, match.params.id]);
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  console.log(transactionById);
  const logedIn = localStorage.getItem("login");

  const deleteOrder = (id) => {
    axios
      .delete(`http://localhost:8000/order/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        getTransactionById(match.params.id);
        console.log("succes");
      })
      .catch((err) => {
        alert("Please relog in");
        console.log(err);
      });
  };

  const addOrder = (val) => {
    axios
      .post("http://localhost:8000/order", val, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        getTransactionById(match.params.id);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  const minOrder = (val) => {
    axios
      .post("http://localhost:8000/order", val, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        getTransactionById(match.params.id);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 bg-body rounded fixed-top">
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
      {transactionById.orders.length === 0 && (
        <div className=" btm row  d-flex justify-content-center">
          <h5 className="col-12 d-flex justify-content-center">
            Cart is empty
          </h5>
          <Link to="/shop">
            <button className="btn btn-dark col-10 d-flex justify-content-center">
              Shop
            </button>
          </Link>
        </div>
      )}
      {transactionById.orders.length !== 0 && (
        <div className="chartLand row d-flex justify-content-start">
          <div className="marginR col-5">
            {transactionById.orders &&
              transactionById.orders.map((e, index) => {
                return (
                  <div className="listCart row shadow-sm p-3 mb-5 bg-light bg-body rounded">
                    <div className="col-3">
                      <img
                        className=""
                        src={data
                          .filter((val) => val.id === e.product_id)
                          .map((e) => e.images[0].url)}
                        width="100px"
                      />
                    </div>
                    <div className="col-8">
                      <p className="prdName">
                        {data
                          .filter((val) => val.id === e.product_id)
                          .map((e) => e.name)}
                      </p>
                      <p className="prdPrice">
                        <b>
                          IDR{" "}
                          {e.product_discount
                            .toString()
                            .split("")
                            .reverse()
                            .join("")
                            .match(/\d{1,3}/g)
                            .join(".")
                            .split("")
                            .reverse()
                            .join("")}
                        </b>
                      </p>
                    </div>
                    <div className="bottomCart col d-flex justify-content-end">
                      {e.product_qty > 1 && (
                        <img
                          onClick={() =>
                            minOrder({
                              product_id: e.product_id,
                              product_qty: -1,
                              transaction_id: transactionById.id,
                            })
                          }
                          src={min}
                          width="25px"
                          height="25px"
                        />
                      )}
                      {e.product_qty === 1 && (
                        <img src={min} width="25px" height="25px" />
                      )}

                      <span>{e.product_qty}</span>
                      <img
                        onClick={() =>
                          addOrder({
                            product_id: e.product_id,
                            product_qty: 1,
                            transaction_id: transactionById.id,
                          })
                        }
                        src={add}
                        width="25px"
                        height="25px"
                      />
                      <button
                        onClick={() => deleteOrder(e.id)}
                        className="rmv btn btn-dark"
                      >
                        <p>Remove</p>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="paymentBox col-4">
            <div className="row shadow-sm p-3 mb-5 bg-body rounded d-flex justify-content-center">
              <div className="col-4">
                <h5>Total</h5>
              </div>
              <div className="col-8 d-flex justify-content-end">
                <h3>
                  IDR{" "}
                  {transactionById !== null &&
                    transactionById.total_payment
                      .toString()
                      .split("")
                      .reverse()
                      .join("")
                      .match(/\d{1,3}/g)
                      .join(".")
                      .split("")
                      .reverse()
                      .join("")}
                </h3>
              </div>
            </div>
            <Link to="/payment">
              <div className="row shadow-sm p-3 mb-5 bg-body rounded d-flex justify-content-center">
                <button className="btn btn-dark col-11">Chekout</button>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStatetoProps = (props) => {
  return {
    detailProduct: props.product.detailProduct,
    transactionById: props.product.transactionById,
    data: props.product.data,
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
  getProduct: () =>
    axios.get("http://localhost:8000/product").then((response) =>
      dispatch({
        type: "GET_PRODUCT",
        value: response.data.data,
      })
    ),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Chart);
