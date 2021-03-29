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
}) => {
  const load = () => {
    getTransaction();
  };
  console.log(transaction);
  useEffect(() => {
    getTransactionById(match.params.id);
  }, [getTransactionById, match.params.id]);

  const payNow = (val) => {
    axios
      .patch("http://localhost:8000/transaction/", val, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert("success payment");
        getTransactionById(localStorage.getItem("trscId"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div onLoad={load} className="down">
      <UserNavbar />
      <div className="paymnt row d-flex justify-content-center ">
        <div className="shadow p-3 mb-5 bg-body rounded col-5">
          <div className="e row d-flex justify-content-center">
            <h4>Payment detail</h4>
          </div>
          <div className="e row justify-content-center">
            <h5 className="col-4">Total : </h5>
            <h5 className="prc col-6">
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
            </h5>
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
                    id: transactionById.id,
                    status: "Paid",
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
