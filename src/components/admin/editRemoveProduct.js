import { Link } from "react-router-dom";
import shop from "../../img/tshirt1.jpg";
import UserManage from "../user-manage";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import errImg from "../../img/error-image-generic.png";
import Size from "../admin/editSize";
import Image from "../admin/editImage";

const Edit = ({ detailProduct, toDetail, match, history, updateProduct }) => {
  useEffect(() => {
    toDetail(match.params.id);
  }, [toDetail, match.params.id]);
  const logedIn = localStorage.getItem("login");
  const logout = () => {
    localStorage.setItem("login", "false");
    alert("succes logout");
    history.push("/");
  };

  const [name, setName] = useState(detailProduct.name);
  const [description, setDescription] = useState(detailProduct.description);
  const [stock, setStock] = useState(detailProduct.stock);
  const [price, setPrice] = useState(detailProduct.price);
  const [color, setColor] = useState(detailProduct.color);
  const [sex, setSex] = useState(detailProduct.sex);

  useEffect(() => {
    setName(detailProduct.name);
    setDescription(detailProduct.description);
    setStock(detailProduct.stock);
    setPrice(detailProduct.price);
    setColor(detailProduct.color);
    setSex(detailProduct.sex);
  }, [detailProduct]);

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 bg-body rounded">
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
      <div className="incHigh row d-flex justify-content-center">
        <div className="user2 col-8 shadow p-3 mb-5 bg-body rounded ">
          <div className="storename">
            <div className="ed userIcon">
              <span>
                <b>Image & size</b>
              </span>
            </div>
            <Image />
          </div>
          <div className="storename">
            <Size />
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="user2 col-8 shadow p-3 mb-5 bg-body rounded ">
          <div className="storename">
            <div className="ed userIcon">
              <span>
                <b>Product information</b>
              </span>
            </div>
            <div className="marg row d-flex justify-content-center">
              <div className="col-3">
                <p>Product name</p>
              </div>
              <div className="col-8 d-flex justify-content-end">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  class="form-control"
                  type="text"
                  placeholder="Product name..."
                  aria-label="default input example"
                />
              </div>
            </div>
            <div className="marg row d-flex justify-content-center">
              <div className="col-3">
                <p>Description</p>
              </div>
              <div className="col-8 d-flex justify-content-end">
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  class="form-control"
                  type="textarea"
                  placeholder="Description..."
                  aria-label="default input example"
                />
              </div>
            </div>
            <div className="marg row d-flex justify-content-center">
              <div className="col-3">
                <p>Stock</p>
              </div>
              <div className="col-8 d-flex justify-content-end">
                <input
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  class="form-control"
                  type="number"
                  placeholder="0"
                  aria-label="default input example"
                />
              </div>
            </div>
            <div className="marg row d-flex justify-content-center">
              <div className="col-3">
                <p>Price</p>
              </div>
              <div className="col-8 d-flex justify-content-end">
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  class="form-control"
                  type="number"
                  placeholder="0"
                  aria-label="default input example"
                />
              </div>
            </div>
            <div className="marg row d-flex justify-content-center">
              <div className="col-3">
                <p>Color</p>
              </div>
              <div className="col-8 d-flex justify-content-end">
                <input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  class="form-control"
                  type="text"
                  placeholder="Color..."
                  aria-label="default input example"
                />
              </div>
            </div>
            <div className="marg row d-flex justify-content-center">
              <div className="col-3">
                <p>Sex</p>
              </div>
              <div className="col-8 d-flex justify-content-start">
                <input
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  class="form-control"
                  type="text"
                  placeholder="Male/Female"
                  aria-label="default input example"
                />
              </div>
            </div>
            {(name !== detailProduct.name ||
              description !== detailProduct.description ||
              stock !== detailProduct.stock ||
              price !== detailProduct.price ||
              color !== detailProduct.color ||
              sex !== detailProduct.sex) && (
              <div className="marg row d-flex justify-content-center">
                <Link to="/seller/my-product">
                  <button
                    onClick={() =>
                      updateProduct({
                        id: match.params.id,
                        name: name,
                        description: description,
                        stock: stock,
                        price: price,
                        discount: price - price * 0.15,
                        color: color,
                        sex: sex,
                      })
                    }
                    type="button"
                    className="btnAdd btn btn-dark col-12"
                  >
                    Edit
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStatetoProps = (props) => {
  return {
    detailProduct: props.product.detailProduct,
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
  updateProduct: (updatedProduct) =>
    axios
      .patch(`http://localhost:8000/product/`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) =>
        dispatch({
          type: "UPDATE_PRODUCT",
          value: response.data.data,
        })
      )
      .catch((error) => {
        console.log(error);
        alert("You must re-login");
        localStorage.setItem("login", "false");
        localStorage.removeItem("token");
      }),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Edit);
