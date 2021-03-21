import { Link } from "react-router-dom";
import edt from "../../img/pencil.png";
import del from "../../img/delete (1).png";
import UserManage from "../user-manage";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import errImg from "../../img/error-image-generic.png";

const MyProduct = ({ history, getProduct, data }) => {
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  console.log(data);
  const logedIn = localStorage.getItem("login");
  const logout = () => {
    localStorage.setItem("login", "false");
    alert("succes logout");
    history.push("/");
  };

  const rmv = (val) => {
    axios
      .delete(`http://localhost:8000/product/${val}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert(res.data.message);
        getProduct();
      });
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 bg-body rounded fixed-top">
        <div class="container-fluid">
          <p class="navbar-brand user">
            {logedIn === "true" && <UserManage />}
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
                  <a class="nav-link" aria-current="page">
                    Home
                  </a>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/seller">
                  <p class="nav-link">Admin page</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {logedIn === "true" && (
          <button
            class="logoutbtn btn btn-outline-dark"
            type="submit"
            onClick={logout}
          >
            Logout
          </button>
        )}
        {logedIn === "false" && (
          <Link to="/login">
            <button class="loginbtn btn btn-dark" type="submit">
              Login
            </button>
          </Link>
        )}
      </nav>
      <div className="mrgTop row d-flex justify-content-center ">
        {data &&
          data.map((e, index) => {
            return (
              <div>
                <div class="edtlist list-group shadow-sm p-3 bg-body rounded">
                  <div class="list-group-item list-group-item-action">
                    <div class="minMrgin d-flex w-100 justify-content-between">
                      <h5 class="m mb-1">{e.name}</h5>
                      {e.images.length > 0 && (
                        <img className="n rounded" src={e.images[0].url} />
                      )}
                      {e.images.length === 0 && (
                        <img className="n rounded" src={errImg} />
                      )}
                      <Link to={`/seller/my-product/${e.id}`}>
                        <p className="delBtn">
                          <img src={edt} />
                        </p>
                      </Link>
                      <p className="delBtn">
                        <img src={del} onClick={() => rmv(e.id)} />
                      </p>
                    </div>
                    <p class="mb-1">
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
                    </p>
                    <p class="text-muted">Stock: {e.stock}</p>
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
});

export default connect(mapStatetoProps, mapDispatchtoProps)(MyProduct);
