import { Link } from "react-router-dom";
import "../admin/style.css";
import { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import SizeHandle from "../admin/addSizeHandle";
import AddImage from "../admin/addImage";
import {
  Dropdown,
  DropdownButton,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import UserNavbar from "../navbar/usernavbar";

const AddProduct = ({ history, addProduct, newProduct, reset }) => {
  console.log(newProduct);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [chategory, setChategory] = useState("");
  const [stock, setStock] = useState(null);
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [sex, setSex] = useState("");
  const change = (val) => {
    setChategory(val);
  };
  console.log(sex);
  return (
    <div>
      <UserNavbar />
      <div className="top row d-flex justify-content-center">
        <div className="user2 col-8 shadow p-3 mb-5 bg-body rounded ">
          {newProduct.name === "" && (
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
                    value={name.charAt(0).toUpperCase() + name.slice(1)}
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
                  <textarea
                    value={
                      description.charAt(0).toUpperCase() + description.slice(1)
                    }
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
                    value={color.charAt(0).toUpperCase() + color.slice(1)}
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
                  <p>Chategory</p>
                </div>
                <InputGroup className="select col-8">
                  <FormControl
                    placeholder="Chategory..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={chategory}
                  />

                  <DropdownButton
                    as={InputGroup.Append}
                    className="set"
                    variant="outline-secondary"
                    title="Select"
                    id="input-group-dropdown-1"
                  >
                    <Dropdown.Item
                      value="T-Shirt"
                      onClick={() => change("T-Shirt")}
                    >
                      T-Shirt
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => change("Jacket")}>
                      Jacket
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => change("Shoes")}>
                      Shoes
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => change("Jeans")}>
                      Jeans
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => change("Hat")}>
                      Hat
                    </Dropdown.Item>
                  </DropdownButton>
                </InputGroup>
              </div>
              <div className="marg row d-flex justify-content-center">
                <div className="col-3">
                  <p>Sex</p>
                </div>
                <div className="col-8 d-flex justify-content-center">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="Male"
                      onClick={(e) => setSex(e.target.value)}
                    />
                    <label class="bgc form-check-label" for="inlineRadio1">
                      Male
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input-secondary"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="Female"
                      onClick={(e) => setSex(e.target.value)}
                    />
                    <label class="form-check-label" for="inlineRadio2">
                      Female
                    </label>
                  </div>
                </div>
              </div>

              {!(name === "") &&
                !(description === "") &&
                !(chategory === "") &&
                !(stock === null) &&
                !(price === null) &&
                !(color === "") &&
                (sex === "Female" || sex === "Male") && (
                  <div className="marg row d-flex justify-content-center">
                    <button
                      onClick={() =>
                        addProduct({
                          name: name,
                          description: description,
                          chategory: chategory,
                          stock: stock,
                          price: price,
                          discount: price - price * 0.2,
                          color: color,
                          sex: sex,
                        })
                      }
                      type="button"
                      class="btn btn-dark col-8"
                    >
                      Save
                    </button>
                  </div>
                )}
            </div>
          )}
          {newProduct.name !== "" && (
            <div className="storename2">
              <div className="ed userIcon">
                <span>
                  <b>Product information</b>
                </span>
              </div>
              <div className="marg row d-flex justify-content-center">
                <div className="col-3">
                  <p>Product name</p>
                </div>
                <div className="col-8 d-flex justify-content-center">
                  <p>
                    <b>{newProduct.name}</b>
                  </p>
                </div>
              </div>
              <div className="marg row d-flex justify-content-center">
                <div className="col-3">
                  <p>Description</p>
                </div>
                <div className="col-8 d-flex justify-content-center">
                  <p>
                    <b>{newProduct.description}</b>
                  </p>
                </div>
              </div>
              <div className="marg row d-flex justify-content-center">
                <div className="col-3">
                  <p>Stock</p>
                </div>
                <div className="col-8 d-flex justify-content-center">
                  <p>
                    <b>{newProduct.stock}</b>
                  </p>
                </div>
              </div>
              <div className="marg row d-flex justify-content-center">
                <div className="col-3">
                  <p>Price</p>
                </div>
                <div className="col-8 d-flex justify-content-center">
                  <p>
                    <b>
                      {newProduct.price
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
                </div>
              </div>
              <div className="marg row d-flex justify-content-center">
                <div className="col-3">
                  <p>Color</p>
                </div>
                <div className="col-8 d-flex justify-content-center">
                  <p>
                    <b>{newProduct.color}</b>
                  </p>
                </div>
              </div>
              <div className="marg row d-flex justify-content-center">
                <div className="col-3">
                  <p>Chategory</p>
                </div>
                <div className="col-8 d-flex justify-content-center">
                  <p>
                    <b>{newProduct.chategory}</b>
                  </p>
                </div>
              </div>
              <div className="marg row d-flex justify-content-center">
                <div className="col-3">
                  <p>Sex</p>
                </div>
                <div className="col-8 d-flex justify-content-center">
                  <p>
                    <b>{newProduct.sex}</b>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {newProduct.name !== "" && (
        <div className="row d-flex justify-content-center">
          <div className="user2 col-8 shadow p-3 mb-5 bg-body rounded ">
            <div className="storename">
              <div className="ed userIcon">
                <span>
                  <b>Image & size</b>
                </span>
              </div>
              <AddImage />
            </div>
            <div className="storename">
              <SizeHandle />
            </div>
          </div>
        </div>
      )}
      {newProduct.name !== "" && (
        <div className="row d-flex justify-content-center">
          <Link to="/seller">
            <button
              onClick={() =>
                reset({
                  id: "",
                  name: "",
                  description: "",
                  chategory: "",
                  stock: 0,
                  price: 0,
                  discount: 0,
                  sex: "",
                  color: "",
                })
              }
              type="button"
              class="w btn btn-dark"
            >
              Save
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

const mapStatetoProps = (props) => {
  return {
    newProduct: props.product.newProduct,
  };
};

const mapDispatchtoProps = (dispatch) => ({
  addProduct: (newProduct) =>
    axios
      .post(`http://localhost:8000/product/`, newProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) =>
        dispatch({
          type: "ADD_PRODUCT",
          value: response.data.data,
        })
      )
      .catch((error) => {
        alert("You must re-login");
        localStorage.setItem("login", "false");
        localStorage.removeItem("token");
      }),
  reset: (val) =>
    dispatch({
      type: "ADD_PRODUCT",
      value: val,
    }),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(AddProduct);
