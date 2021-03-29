import "../shop/style.css";
import axios from "axios";
import { useEffect } from "react";
import { connect } from "react-redux";
import UserNavbar from "../navbar/usernavbar";

const History = ({ getTransaction, transaction, data, getProduct, match }) => {
  useEffect(() => {
    getTransaction();
  }, [getTransaction]);
  useEffect(() => {
    getProduct();
  }, [getProduct]);

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
        console.log(err);
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
              </div>
            );
          })}
      </div>
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
