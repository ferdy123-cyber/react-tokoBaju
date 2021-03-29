import { connect } from "react-redux";
import UserNavbar from "../navbar/usernavbar";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
const NewOrder = ({
  getAllTransaction,
  getProduct,
  data,
  allTransaction,
  history,
  getUser,
  user,
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
  const newOrder =
    allTransaction && allTransaction.filter((e) => e.status === "Paid");

  const proceed = (val) => {
    axios
      .patch("http://localhost:8000/transaction/", val, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert("success");
        getAllTransaction();
        if (newOrder.length === 0) {
          history.push("/seller");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="">
      <UserNavbar />
      <div className="cont row d-flex justify-content-center ">
        {newOrder.length !== 0 && <p className="ttl col-8">New Orders</p>}
        {newOrder.length === 0 && (
          <p className="ttl col-8">New Orders (Empty)</p>
        )}
        {newOrder &&
          newOrder
            .sort(
              (a, b) =>
                new moment(b.updated_at).format("YYYYMMDDhmmss") -
                new moment(a.updated_at).format("YYYYMMDDhmmss")
            )
            .map((e) => {
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
                        <button
                          onClick={() =>
                            proceed({
                              id: e.id,
                              status: "Success",
                            })
                          }
                          className=" proced btn btn-dark col-12"
                        >
                          Proceed
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

export default connect(mapStatetoProps, mapDispatchtoProps)(NewOrder);
