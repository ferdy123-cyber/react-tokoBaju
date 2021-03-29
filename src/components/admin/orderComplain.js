import { connect } from "react-redux";
import UserNavbar from "../navbar/usernavbar";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";

const ComplainOrder = ({
  getAllTransaction,
  getProduct,
  data,
  allTransaction,
  history,
  user,
  getUser,
}) => {
  useEffect(() => {
    getUser();
  }, [getUser]);
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  useEffect(() => {
    getAllTransaction();
  }, [getAllTransaction]);
  const complainOrder =
    allTransaction && allTransaction.filter((e) => e.status === "Canceling");

  const cancel = (val) => {
    axios
      .patch("http://localhost:8000/transaction/", val, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert("success");
        getAllTransaction();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="">
      <UserNavbar />
      <div className="cont row d-flex justify-content-center ">
        {complainOrder.length !== 0 && (
          <p className="ttl col-8">Complain Orders</p>
        )}
        {complainOrder.length === 0 && (
          <p className="ttl col-8">Complain Orders (Empty)</p>
        )}
        {complainOrder &&
          complainOrder.map((e) => {
            return (
              <div className="bdy col-9 row d-flex justify-content-center shadow p-3 mb-5 bg-body">
                <div className="col-12 row">
                  <p className="usrId col-6">
                    {user
                      .filter((val) => val.id === e.user_id)
                      .map((a) => a.full_name)}{" "}
                    | {e.user_id}
                  </p>
                  <p className="tgl usrId col-6">
                    {moment(e.updated_at).format("lll")}
                  </p>
                  <div className="col-10 row">
                    {e.orders.map((val) => {
                      return (
                        <div className="bordr col-12 row d-flex justify-content-start">
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
                      <button
                        onClick={() =>
                          cancel({
                            id: e.id,
                            status: "Canceled",
                          })
                        }
                        className=" proced btn btn-warning col-12"
                      >
                        Cancel
                      </button>
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
    user: props.product.user,
    allTransaction: props.product.allTransaction,
  };
};

const mapDispatchtoProps = (dispatch) => ({
  getUser: () =>
    axios.get("http://localhost:8000/auth/get").then((response) =>
      dispatch({
        type: "GET_USER",
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

  getAllTransaction: () =>
    axios
      .get("http://localhost:8000/transaction/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) =>
        dispatch({
          type: "ALL_TRANSACTION",
          value: response.data.data,
        })
      )
      .catch((err) => {
        alert(err.response.data.message);
      }),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(ComplainOrder);