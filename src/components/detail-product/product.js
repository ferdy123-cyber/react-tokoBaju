import "../detail-product/product.css";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import UserNavbar from "../navbar/usernavbar";
import { ShopWindow } from "react-bootstrap-icons";

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
            product_discount: 100000,
          });
          localStorage.setItem("trscId", response.data.data.id);
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
        product_discount: 100000,
      });
      getTransactionById(trscPending[0].id);
      history.push(`/cart/${trscPending[0].id}`);
    }
  };

  const [idx, setIdx] = useState(0);

  const showImg = (val) => {
    setIdx(val);
  };
  const [cart, setCart] = useState(false);

  const updatePrice = (value) => {
    setCart(true);
  };

  return (
    <div className="down div2">
      <UserNavbar />
      <div className="row d-flex justify-content-center">
        <div className="detailImg col-4 row ">
          <img
            className="img col-12 shadow-sm p-3 bg-body rounded"
            src={detailProduct.images[idx].url}
            alt="..."
          />
          {detailProduct.images &&
            detailProduct.images.map((e, index) => {
              return (
                <img
                  className="view col-2"
                  src={e.url}
                  onMouseEnter={() => showImg(index)}
                  alt="..."
                />
              );
            })}
        </div>
        <div className="dtl col-6 row">
          <div className="col-4">
            <span class="sp badge bg-dark">{detailProduct.stock} Stock</span>
          </div>
          <p className="ttl col-12">
            {detailProduct.name} - {detailProduct.color}
          </p>
          <p className="dis ttl col-12">
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
          </p>
          <p className="dis dis2 col-12">
            <s>
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
            </s>
            {"  "}
            20% OFF
          </p>
          <hr className="col-12" />
          <div className="siezes filter col-12 row justify-content-center shadow-sm bg-body rounded">
            {detailProduct.sizes &&
              detailProduct.sizes.map((e, index) => {
                return (
                  <button
                    onClick={() => updatePrice(e.percentage_price)}
                    className="btn btn-dark filterButton btn btn-dark col-2"
                  >
                    {e.size}
                  </button>
                );
              })}
            {/* {key !== "" && (
              <button onClick={() => fil("")} className="filterButton col-2">
                All
              </button>
            )}
            {key === "" && (
              <button
                onClick={() => fil("")}
                className="adjust btn btn-dark  col-2"
              >
                All
              </button>
            )}
            {key !== "T-Shirt" && (
              <button
                onClick={() => fil("T-Shirt")}
                className="filterButton col-2"
              >
                T-Shirt
              </button>
            )}
            {key === "T-Shirt" && (
              <button
                onClick={() => fil("T-Shirt")}
                className="adjust btn btn-dark col-2"
              >
                T-Shirt
              </button>
            )}
            {key !== "Jeans" && (
              <button
                onClick={() => fil("Jeans")}
                className="filterButton col-2"
              >
                Jeans
              </button>
            )}
            {key === "Jeans" && (
              <button
                onClick={() => fil("Jeans")}
                className="adjust btn btn-dark col-2"
              >
                Jeans
              </button>
            )}
            {key !== "Jacket" && (
              <button
                onClick={() => fil("Jacket")}
                className="filterButton col-2"
              >
                Jacket
              </button>
            )}
            {key === "Jacket" && (
              <button
                onClick={() => fil("Jacket")}
                className="adjust btn btn-dark col-2"
              >
                Jacket
              </button>
            )}
            {key !== "Hat" && (
              <button onClick={() => fil("Hat")} className="filterButton col-2">
                Hat
              </button>
            )}
            {key === "Hat" && (
              <button
                onClick={() => fil("Hat")}
                className="adjust btn btn-dark col-2"
              >
                Hat
              </button>
            )}
            {key !== "Shoes" && (
              <button
                onClick={() => fil("Shoes")}
                className="filterButton col-2"
              >
                Shoes
              </button>
            )}
            {key === "Shoes" && (
              <button
                onClick={() => fil("Shoes")}
                className="adjust btn btn-dark col-2"
              >
                Shoes
              </button>
            )} */}
          </div>
          <hr className="col-12" />
          <p className=" ctr col-12">Chategory: {detailProduct.chategory}</p>
          <p className=" ctr col-12">{detailProduct.description}</p>
        </div>
      </div>
      {/* <div className="deskripsi row d-flex justify-content-center">
        <div className="left col-3">
          {detailProduct.images !== null && (
            <Carousel>
              {detailProduct.images &&
                detailProduct.images.map((e) => {
                  return (
                    <Carousel.Item interval={1800}>
                      <img
                        className="editimg img-fluid d-block w-100 "
                        src={e.url}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  );
                })}
            </Carousel>
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
      </div> */}
      {localStorage.getItem("role") === "user" && (
        <div className="row d-flex justify-content-end">
          <div className="col-5 row d-flex justify-content-center">
            <button className="btmBtn col-4 fixed-botttom">Chat seller</button>
            {cart === true && (
              <button
                onClick={() =>
                  createTransaction({
                    status: "Pending",
                    total_payment: 0,
                  })
                }
                className="btmBtn col-4"
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      )}
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
