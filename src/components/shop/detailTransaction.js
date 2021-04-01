import "../shop/style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import UserNavbar from "../navbar/usernavbar";
import startIcon from "../../img/favourites.png";

const History = ({ getTransaction, transaction, data, getProduct, match }) => {
  useEffect(() => {
    getTransaction();
  }, [getTransaction]);
  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(null);
  const showInputRating = (id) => {
    localStorage.setItem("product_id", id);
    setShow(true);
  };
  console.log(comment);
  console.log(rating);

  const addReview = (review) => {
    console.log(review);
    axios
      .post("http://localhost:8000/review", review, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setComment("");
        setRating(null);
        localStorage.removeItem("product_id");
        setShow(false);
        alert("success");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const cancel = (val) => {
    axios
      .patch("http://localhost:8000/transaction/", val, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert("success");
        getTransaction();
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  const detailTransaction = transaction.filter((e) => e.id === match.params.id);
  return (
    <div>
      <UserNavbar />
      <div className="cont row d-flex justify-content-center ">
        {detailTransaction &&
          detailTransaction.map((e) => {
            return (
              <div className="bdy col-9 row d-flex justify-content-center shadow p-3 mb-5 bg-body">
                <p className="ttl col-12">Detail transactions</p>
                <div className="stts col-12 row d-flex justify-content-start">
                  <div className="col-6 row">
                    <p className="TID col-12">Transaction ID</p>
                    <p className="ID col-12">{e.id}</p>
                    <p className="TID col-12">Status</p>
                    <p className="ID col-12">{e.status}</p>
                  </div>
                  <div className="kanan col-6 row d-flex justify-content-end">
                    <button className="btn btn-dark">Chat seller</button>
                    {e.status === "Paid" && (
                      <button
                        onClick={() =>
                          cancel({
                            id: e.id,
                            status: "Canceling",
                          })
                        }
                        className="btn btn-danger"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                <div className="col-12 row">
                  <p className="tgl usrId col-6"></p>
                  <div className="col-10 row">
                    {e.orders.map((val) => {
                      return (
                        <div className="topBdr bordr col-12 row d-flex justify-content-start">
                          <img
                            alt="..."
                            className="imgOrder col-3 "
                            src={data
                              .filter((data) => data.id === val.product_id)
                              .map((a) => a.images[0].url)}
                          />
                          <p className="ttlOrder col-9">
                            <p>
                              {data
                                .filter((data) => data.id === val.product_id)
                                .map((a) => a.name)}
                            </p>
                            <p className="prc2">
                              {val.product_qty} item (
                              {val.product_discount
                                .toString()
                                .split("")
                                .reverse()
                                .join("")
                                .match(/\d{1,3}/g)
                                .join(".")
                                .split("")
                                .reverse()
                                .join("")}
                              )
                            </p>
                            {e.status === "Success" && (
                              <p className="prc2">
                                <button
                                  onClick={() =>
                                    showInputRating(val.product_id)
                                  }
                                  className="addRating btn btn-light"
                                >
                                  give review
                                </button>
                              </p>
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="bdrHgt hgt col-2 row d-flex justify-content-center align-items-center">
                    <div className="col row d-flex justify-content-start">
                      <p className="prc3 col-12">Total price</p>
                      <p className="prc4 col-12">
                        IDR
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
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {show === true && (
        <div className="row">
          <div className="inptRating col-12 row d-flex justify-content-center fixed-top">
            <div className="inpt col-5 row ">
              <div class="col-12 row d-flex justify-content-center">
                {rating !== 5 && (
                  <button
                    onClick={() => setRating(5)}
                    className="btnRating btn btn-light col-2"
                  >
                    <img src={startIcon} width="25px" alt="..." />{" "}
                    <span>5</span>
                  </button>
                )}
                {rating === 5 && (
                  <button
                    onClick={() => setRating(5)}
                    className="btnRating btn btn-secondary col-2"
                  >
                    <img src={startIcon} width="25px" alt="..." />{" "}
                    <span>5</span>
                  </button>
                )}
                {rating !== 4 && (
                  <button
                    onClick={() => setRating(4)}
                    className="btnRating btn btn-light col-2"
                  >
                    <img src={startIcon} width="25px" alt="..." />{" "}
                    <span>4</span>
                  </button>
                )}
                {rating === 4 && (
                  <button
                    onClick={() => setRating(4)}
                    className="btnRating btn btn-secondary col-2"
                  >
                    <img src={startIcon} width="25px" alt="..." />{" "}
                    <span>4</span>
                  </button>
                )}
                {rating !== 3 && (
                  <button
                    onClick={() => setRating(3)}
                    className="btnRating btn btn-light col-2"
                  >
                    <img src={startIcon} width="25px" alt="..." />{" "}
                    <span>3</span>
                  </button>
                )}
                {rating === 3 && (
                  <button
                    onClick={() => setRating(3)}
                    className="btnRating btn btn-secondary col-2"
                  >
                    <img src={startIcon} width="25px" alt="..." />{" "}
                    <span>3</span>
                  </button>
                )}
                {rating !== 2 && (
                  <button
                    onClick={() => setRating(2)}
                    className="btnRating btn btn-light col-2"
                  >
                    <img src={startIcon} width="25px" alt="..." />{" "}
                    <span>2</span>
                  </button>
                )}
                {rating === 2 && (
                  <button
                    onClick={() => setRating(2)}
                    className="btnRating btn btn-secondary col-2"
                  >
                    <img src={startIcon} width="25px" alt="..." />{" "}
                    <span>2</span>
                  </button>
                )}
                {rating !== 1 && (
                  <button
                    onClick={() => setRating(1)}
                    className="btnRating btn btn-light col-2"
                  >
                    <img src={startIcon} width="25px" alt="..." />{" "}
                    <span>1</span>
                  </button>
                )}
                {rating === 1 && (
                  <button
                    onClick={() => setRating(1)}
                    className="btnRating btn btn-secondary col-2"
                  >
                    <img src={startIcon} width="25px" alt="..." />{" "}
                    <span>1</span>
                  </button>
                )}
              </div>
              <div class="col-12">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="2"
                />
              </div>
              <div className="col-12 row d-flex justify-content-end">
                <button
                  onClick={() => setShow(false)}
                  className="btmbtn col-2 btn btn-danger"
                >
                  Cancel
                </button>
                {rating !== null && (
                  <button
                    onClick={() =>
                      addReview({
                        product_id: localStorage.getItem("product_id"),
                        rating: rating,
                        comment: comment,
                      })
                    }
                    className="btmbtn col-2 btn btn-secondary"
                  >
                    Submit
                  </button>
                )}
                {rating === null && (
                  <button className="btmbtn col-2 btn btn-light">Submit</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStatetoProps = (props) => {
  return {
    data: props.product.data,
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

  getProduct: () =>
    axios.get("http://localhost:8000/product").then((response) =>
      dispatch({
        type: "GET_PRODUCT",
        value: response.data.data,
      })
    ),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(History);
