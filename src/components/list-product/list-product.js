import "../list-product/list-product.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import errImg from "../../img/error-image-generic.png";
import user from "../../img/user.png";

const ListProduct = ({ data, toDetail, getProduct }) => {
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  console.log(data);
  const logedIn = localStorage.getItem("login");
  const userName = localStorage.getItem("name");
  // const role = localStorage.getItem("role");
  const [Input, setInput] = useState("");
  return (
    <div className="div">
      <nav class="nav1 navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 bg-body rounded">
        <div class="container-fluid">
          <p class="navbar-brand user">
            {logedIn === "true" && (
              <div className="userIcon">
                <img src={user} width="28px" height="28px" />
                <span>{userName}</span>
              </div>
            )}
            {logedIn === "false" && ""}
          </p>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to="/">
                  <p class="nav-link" aria-current="page">
                    Home
                  </p>
                </Link>
              </li>
              <li class="nav-item">
                <p class="nav-link active">Shop</p>
              </li>
            </ul>
            <form class="searchBar d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setInput(e.target.value)}
              />
              {/* {logedIn === "true" && role === "admin" && (
                <Link to='/manage-product'>
                  <img src={chek} width="30px" height="30px" />
                </Link>
              )} */}
            </form>
          </div>
        </div>
      </nav>
      <div className="row">
        <div className="col-2">
          <div className="leftd">
            <p>FEATURED</p>
            <ul>
              <li>
                <a href="">T-SHIRT</a>
              </li>
              <li>
                <a href="">JEANS</a>
              </li>
              <li>
                <a href="">HAT</a>
              </li>
              <li>
                <a href="">SHOES</a>
              </li>
              <li>
                <a href="">JACKET</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="center col-8">
          <div class="row">
            {data &&
              data
                .filter((e) => {
                  if (Input === "") {
                    return e;
                  } else {
                    return e.name.toLowerCase().includes(Input.toLowerCase());
                  }
                })
                .map((e, index) => {
                  console.log(e.images);
                  return (
                    <div
                      key={index}
                      class="thumb col-4"
                      onClick={() => toDetail(e.id)}
                    >
                      <Link to={`/product/${e.id}`}>
                        {e.images.length > 0 && (
                          <img
                            className="img-thumbnail"
                            src={e.images[0].url}
                            width="145px"
                            height="145px"
                          />
                        )}
                        {(e.images === null || e.images.length === 0) && (
                          <img
                            className="img-thumbnail"
                            src={errImg}
                            height="145px"
                            width="145px"
                          />
                        )}
                        <h3>
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
                        </h3>
                        <p>{e.name}</p>
                      </Link>
                    </div>
                  );
                })}
          </div>
        </div>
        <div className="col-2">
          <div class="rightd">
            <p>ALL</p>
            <ul>
              <li>
                <a href="">FILTER 1</a>
              </li>
              <li>
                <a href="">FILTER 2</a>
              </li>
              <li>
                <a href="">FILTER 3</a>
              </li>
              <li>
                <a href="">FILTER 4</a>
              </li>
              <li>
                <a href="">FILTER 5</a>
              </li>
            </ul>
          </div>
        </div>
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
});

export default connect(mapStatetoProps, mapDispatchtoProps)(ListProduct);
