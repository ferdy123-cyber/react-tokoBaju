import { Link } from "react-router-dom";
import "../shop/style.css";
import { connect } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import UserNavbar from "../navbar/usernavbar";

const Payment = ({
  getTransactionById,
  getTransaction,
  transaction,
  transactionById,
  match,
  data,
  getProduct,
}) => {
  useEffect(() => {
    getTransaction();
  }, [getTransaction]);
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  console.log(transaction);

  console.log(transactionById);

  const payNow = (val) => {
    axios
      .patch("http://localhost:8000/transaction/", val, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert("success payment");
        getTransaction();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const detailTransaction = transaction.filter((e) => e.id === match.params.id);

  return (
    <div>
      <UserNavbar />
      <div className="cont row d-flex justify-content-center ">
        {detailTransaction.map((e) => {
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
              <button
                onClick={() =>
                  payNow({
                    id: e.id,
                    status: "Paid",
                  })
                }
                className="payBtn btn btn-secondary col-12"
              >
                Pay (
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
                )
              </button>
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
