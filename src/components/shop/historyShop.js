import "../shop/style.css";
import axios from "axios";
import { useEffect } from "react";
import { connect } from "react-redux";
import UserNavbar from "../navbar/usernavbar";
import moment from "moment";

const History = ({ getTransaction, transaction, data, getProduct }) => {
  useEffect(() => {
    getTransaction();
  }, [getTransaction]);
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  const array = [
    { date: "2018-05-11 14:08" },
    { date: "2018-05-11 14:07" },
    { date: "2018-05-11 07:45" },
    { date: "2018-05-12 07:45" },
    { date: "2018-05-10 07:45" },
    { date: "2018-06-01 07:45" },
    { date: "2018-05-30 07:45" },
  ];
  // const sortedArray = array.sort(
  //   (a, b) =>
  //     new moment(a.date).format("LLL") - new moment(b.date).format("LLL")
  // );
  console.log(array);
  const sortedArray = array.sort(
    (a, b) =>
      new moment(b.date).format("YYYYMMDDhmm") -
      new moment(a.date).format("YYYYMMDDhmm")
  );
  console.log(sortedArray);
  // console.log(sortedArray);
  return (
    <div>
      <UserNavbar />
      <div className="cont row d-flex justify-content-center ">
        <p className="ttl col-8">Transactions</p>
        {transaction &&
          transaction
            .sort(
              (a, b) =>
                new moment(b.updated_at).format("YYYYMMDDhmmss") -
                new moment(a.updated_at).format("YYYYMMDDhmmss")
            )
            .map((e) => {
              return (
                <div className="bdy col-9 row d-flex justify-content-center shadow p-3 mb-5 bg-body">
                  <div className="col-12 row">
                    <p className="usrId col-6">{e.id}</p>
                    <p className="tgl usrId col-6">
                      {moment(e.updated_at).format("lll")}
                    </p>
                    <div className="col-10 row">
                      {e.orders.map((val) => {
                        return (
                          <div className="bordr col-12 row d-flex justify-content-start">
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
                    <div className="hgt col-2 row d-flex justify-content-center align-items-center">
                      <div className="col row d-flex justify-content-start">
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
                        {e.status === "Success" && (
                          <button className=" proced btn btn-success col-12">
                            {e.status}
                          </button>
                        )}
                        {e.status === "Paid" && (
                          <button className=" proced btn btn-warning col-12">
                            {e.status}
                          </button>
                        )}
                        {e.status === "Canceled" && (
                          <button className=" proced btn btn-danger col-12">
                            {e.status}
                          </button>
                        )}
                        {e.status === "Pending" && (
                          <button className=" proced btn btn-light col-12">
                            {e.status}
                          </button>
                        )}
                        {e.status === "Canceling" && (
                          <button className="fixText proced btn btn-outline-danger col-12">
                            {e.status}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <a
                    href={`/transaction/${e.id}`}
                    className="btnHistory btn btn-light col-12 "
                  >
                    Detail
                  </a>
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
