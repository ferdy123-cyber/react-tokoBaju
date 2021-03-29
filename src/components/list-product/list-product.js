import "../list-product/list-product.css";
import { useEffect, useState } from "react";
import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import UserNavbar from "../navbar/usernavbar";
import { Card } from "react-bootstrap";
import moment from "moment";

const ListProduct = ({ data, toDetail, getProduct }) => {
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  const [key, setKey] = useState("");
  const fil = (val) => {
    setKey(val);
  };
  console.log(data);
  return (
    <div className="dark down div row justify-content-center">
      <UserNavbar />

      <div className="filter col-10 row justify-content-center shadow bg-body rounded">
        {key !== "" && (
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
          <button onClick={() => fil("T-Shirt")} className="filterButton col-2">
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
          <button onClick={() => fil("Jeans")} className="filterButton col-2">
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
          <button onClick={() => fil("Jacket")} className="filterButton col-2">
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
          <button onClick={() => fil("Shoes")} className="filterButton col-2">
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
        )}
      </div>
      <div className="col-11 row d-flex justify-content-start">
        {data &&
          data
            .sort(
              (a, b) =>
                new moment(b.created_at).format("YYYYMMDDhmm") -
                new moment(a.created_at).format("YYYYMMDDhmm")
            )
            .filter((e) => {
              if (key === "") {
                return e;
              } else {
                return e.chategory === key;
              }
            })
            .map((e, index) => {
              return (
                <a
                  key={index}
                  class="col-2 "
                  onClick={() => toDetail(e.id)}
                  href={`/product/${e.id}`}
                >
                  <Card
                    className="card shadow bg-body rounded"
                    style={{
                      width: "170px",
                      border: "none",
                    }}
                  >
                    <Card.Img
                      className="img"
                      variant="top"
                      src={e.images[0].url}
                    />
                    <Card.Body>
                      <Card.Title className="cardtitle">{e.name}</Card.Title>
                      <Card.Text className="a cardtitle">
                        IDR{" "}
                        {e.discount
                          .toString()
                          .split("")
                          .reverse()
                          .join("")
                          .match(/\d{1,3}/g)
                          .join(".")
                          .split("")
                          .reverse()
                          .join("")}
                      </Card.Text>
                      <Card.Text className="price cardtitle">
                        <s>
                          IDR{" "}
                          {e.price
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
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </a>
              );
            })}
      </div>
    </div>
  );
};

const mapStatetoProps = (props) => {
  return {
    data: props.product.data,
  };
};

const mapDispatchtoProps = (dispatch) => ({
  getProduct: () =>
    axios.get("http://localhost:8000/product").then((response) =>
      dispatch({
        type: "GET_PRODUCT",
        value: response.data.data,
      })
    ),
  toDetail: (id) =>
    axios.get(`http://localhost:8000/product/${id}`).then((response) =>
      dispatch({
        type: "DETAIL_PRODUCT",
        value: response.data.data,
      })
    ),
  // fil: (val) =>
  //   dispatch({
  //     type: "FILTER",
  //     value: val,
  //   }),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(ListProduct);
