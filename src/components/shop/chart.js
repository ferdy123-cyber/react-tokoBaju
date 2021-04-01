import { Link } from "react-router-dom";
import "../shop/style.css";
import add from "../../img/increase.png";
import min from "../../img/decrease.png";
import { connect } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import UserNavbar from "../navbar/usernavbar";
import moment from "moment";

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

  console.log(transactionById);

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
      <UserNavbar />
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
          <div className="marginR col-7">
            {transactionById.orders
              .sort(
                (a, b) =>
                  new moment(b.createdAt).format("YYYYMMDDhhmmss") -
                  new moment(a.createddAt).format("YYYYMMDDhhmmss")
              )
              .map((e, index) => {
                console.log(
                  moment(e.createdAt).format("MMMM Do YYYY, h:mm:ss a")
                );
                return (
                  <div className="listCart row shadow p-3 mb-5 bg-body rounded">
                    <div className="col-2">
                      <img
                        className="cartImage"
                        src={data
                          .filter((val) => val.id === e.product_id)
                          .map((e) => e.images[0].url)}
                        width="100px"
                        height="100px"
                        alt="order-img"
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
                          alt="min"
                        />
                      )}
                      {e.product_qty === 1 && (
                        <img src={min} width="25px" height="25px" alt="min" />
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
                        alt="increase"
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

          <div className="paymentBox col-3">
            <div className="row shadow-sm p-3 mb-5 bg-body rounded d-flex justify-content-center">
              <p className="col-6">Total</p>
              <p className="text col-6 ">
                IDR{" "}
                {transactionById.total_payment
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
              <a
                href={`/payment/${transactionById.id}`}
                className="col-12 row d-flex justify-content-center"
              >
                <button className="col-12">Chekout</button>
              </a>
            </div>
            {/* <div className="row shadow-sm p-3 mb-5 bg-body rounded d-flex justify-content-center">
              <div className="col-4">
                <h5>Total</h5>
              </div>
              <div className="col-8 d-flex justify-content-end">
                <h5>
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
                </h5>
              </div>
            </div>
            <Link to="/payment">
              <div className="row shadow-sm p-3 mb-5 bg-body rounded d-flex justify-content-center">
                <button className="btn btn-dark col-11">Chekout</button>
              </div>
            </Link> */}
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
          value2: response.data.totalQty,
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
