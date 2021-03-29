import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Size from "../admin/editSize";
import Image from "../admin/editImage";
import {
  Dropdown,
  DropdownButton,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import UserNavbar from "../navbar/usernavbar";

const Edit = ({ detailProduct, toDetail, match, history, getProduct }) => {
  useEffect(() => {
    toDetail(match.params.id);
  }, [toDetail, match.params.id]);

  const [name, setName] = useState(detailProduct.name);
  const [description, setDescription] = useState(detailProduct.description);
  const [chategory, setChategory] = useState(detailProduct.chategory);
  const [stock, setStock] = useState(detailProduct.stock);
  const [price, setPrice] = useState(detailProduct.price);
  const [color, setColor] = useState(detailProduct.color);
  const [sex, setSex] = useState(detailProduct.sex);

  useEffect(() => {
    setName(detailProduct.name);
    setDescription(detailProduct.description);
    setChategory(detailProduct.chategory);
    setStock(detailProduct.stock);
    setPrice(detailProduct.price);
    setColor(detailProduct.color);
    setSex(detailProduct.sex);
  }, [detailProduct]);
  console.log(chategory);
  console.log(sex);

  const updateProduct = (updatedProduct) => {
    axios
      .patch(`http://localhost:8000/product/`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        alert("succes update product");
        getProduct();
      })
      .catch((error) => {
        console.log(error);
        alert("You must re-login");
        localStorage.setItem("login", "false");
        localStorage.removeItem("token");
      });
  };

  return (
    <div className="down">
      <UserNavbar />
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
              <div className="col-2">
                <p>Chategory</p>
              </div>
              <div className="col-9 d-flex justify-content-center">
                <InputGroup className="select1 col-11">
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
                      onClick={() => setChategory("T-Shirt")}
                    >
                      T-Shirt
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setChategory("Jacket")}>
                      Jacket
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setChategory("Shoes")}>
                      Shoes
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setChategory("Jeans")}>
                      Jeans
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setChategory("Hat")}>
                      Hat
                    </Dropdown.Item>
                  </DropdownButton>
                </InputGroup>
                {/* <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="T-Shirt"
                    checked={chategory === "T-Shirt" && "checked"}
                    onClick={(e) => setChategory(e.target.value)}
                  />
                  <label class="form-check-label" for="inlineRadio1">
                    T-Shirt
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="Jacket"
                    checked={chategory === "Jacket" && "checked"}
                    onClick={(e) => setChategory(e.target.value)}
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    Jacket
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="Hat"
                    checked={chategory === "Hat" && "checked"}
                    onClick={(e) => setChategory(e.target.value)}
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    Hat
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="Shoes"
                    checked={chategory === "Shoes" && "checked"}
                    onClick={(e) => setChategory(e.target.value)}
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    Shoes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="Jeans"
                    checked={chategory === "Jeans" && "checked"}
                    onClick={(e) => setChategory(e.target.value)}
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    Jeans
                  </label>
                </div> */}
              </div>
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
                    checked={sex === "Male" && "checked"}
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
                    checked={sex === "Female" && "checked"}
                    onClick={(e) => setSex(e.target.value)}
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    Female
                  </label>
                </div>
              </div>
            </div>
            {(name !== detailProduct.name ||
              description !== detailProduct.description ||
              chategory !== detailProduct.chategory ||
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
                        chategory: chategory,
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
  getProduct: () =>
    axios.get("http://localhost:8000/product").then((response) =>
      dispatch({
        type: "GET_PRODUCT",
        value: response.data.data,
      })
    ),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Edit);
