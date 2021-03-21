import "../detail-product/product.css";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import prev from "../../img/Vector1.png";
import next from "../../img/Vector2.png";
import chek from "../../img/checkout.png";
import logo from "../../img/icon.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import UserManage from "../user-manage";
import errImg from "../../img/error-image-generic.png";

const Product = (props) => {
  const {
    getTransactionById,
    detailProduct,
    toDetail,
    match,
    history,
    transaction,
    getTransaction,
    addOrder,
    transactionById,
  } = props;
  useEffect(() => {
    toDetail(match.params.id);
  }, [toDetail, match.params.id]);

  useEffect(() => {
    getTransaction();
  }, [getTransaction]);

  console.log(transaction);
  const trscPending =
    transaction && transaction.filter((e) => e.status === "Pending");
  console.log(trscPending.map((e) => e.orders).map((e) => e.product_qty));

  const linkCart = trscPending.map((e) => e.id);
  const createTransaction = (val) => {
    const trscPending =
      transaction && transaction.filter((e) => e.status === "Pending");
    console.log(trscPending);
    if (trscPending.length < 1) {
      axios
        .post("http://localhost:8000/transaction", val, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          getTransaction();
          addOrder({
            product_id: detailProduct.id,
            product_qty: 1,
            transaction_id: response.data.data.id,
          });
          getTransactionById(response.data.data.id);
          history.push(`/cart/${response.data.data.id}`);
        })
        .catch((err) => {
          alert(`Please login (${err.response.data.message})`);
          console.log(err);
        });
    } else {
      console.log("ok");
      addOrder({
        product_id: detailProduct.id,
        product_qty: 1,
        transaction_id: trscPending[0].id,
      });
      getTransactionById(trscPending[0].id);
      history.push(`/cart/${trscPending[0].id}`);
    }
  };
  const logedIn = localStorage.getItem("login");
  return (
    <div className="div2">
      <nav class="navProduct navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 bg-body rounded">
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
          <div class="d-flex justify-content-end">
            {trscPending.length !== 0 && (
              <Link to={`/cart/${linkCart}`}>
                <img
                  className="chekout"
                  src={chek}
                  width="25px"
                  height="25px"
                />
              </Link>
            )}

            <span class="bdg badge rounded-pill bg-danger">{}</span>
          </div>
        </div>
      </nav>
      <div className="deskripsi row d-flex justify-content-center">
        <div className="left col-3">
          {detailProduct.images !== null && (
            <Carousel>
              {detailProduct.images &&
                detailProduct.images.map((e, index) => {
                  console.log(e.url);
                  if (e.url !== null) {
                    return (
                      <Carousel.Item interval={1800}>
                        <img
                          className="editimg img-fluid d-block w-100 "
                          src={e.url}
                          alt="First slide"
                        />
                      </Carousel.Item>
                    );
                  }
                })}
            </Carousel>
          )}
          {!(detailProduct.images !== null) && (
            <img
              className="editimg img-fluid d-block w-100 "
              src={errImg}
              alt="First slide"
            />
          )}
        </div>
        <div className="right col-4">
          <div className="storeName">ferdy's store</div>
          <div className="rightDetail">
            <p className="name-size">
              {detailProduct.name} - {detailProduct.color}
            </p>
            <p className="sold">stock : {detailProduct.stock}</p>
            <p className="diskon">
              <b>
                IDR{" "}
                {detailProduct.discount
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
            <p className="normal">
              <del>
                IDR{" "}
                {detailProduct.price
                  .toString()
                  .split("")
                  .reverse()
                  .join("")
                  .match(/\d{1,3}/g)
                  .join(".")
                  .split("")
                  .reverse()
                  .join("")}
              </del>
            </p>
            <div className="lorem1">
              <p>{detailProduct.description}</p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div class="card text-dark bg-light mb-3">
            <div class="card-header">Variant</div>
            <div class="card-body">
              <p className="size">
                Size :
                <select className="size">
                  {detailProduct.sizes &&
                    detailProduct.sizes.map((e, index) => {
                      return <option value="medium">{e.size}</option>;
                    })}
                </select>
              </p>
              <div className="row d-flex justify-content-center">
                <button
                  onClick={() =>
                    createTransaction({
                      status: "Pending",
                      total_payment: 0,
                    })
                  }
                  class="loginbtn2 btn btn-dark col-5"
                  type="submit"
                >
                  Add to chart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStatetoProps = (props) => {
  return {
    detailProduct: props.product.detailProduct,
    transaction: props.product.transaction,
    transactionById: props.product.transactionById,
  };
};

const mapDispatchtoProps = (dispatch) => ({
  toDetail: (id) =>
    axios.get(`http://localhost:8000/product/${id}`).then((response) =>
      dispatch({
        type: "DETAIL_PRODUCT",
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
  addOrder: (val) => {
    axios
      .post("http://localhost:8000/order", val, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) =>
        dispatch({
          type: "ADD_ORDER",
          value: response.data.data,
        })
      )
      .catch((err) => {
        alert(err.response.data.error);
      });
  },
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
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Product);
