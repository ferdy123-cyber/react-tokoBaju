import axios from "axios";
import { useState } from "react";
import { Check } from "react-bootstrap-icons";
import { connect } from "react-redux";
import delIcon from "../../img/delete.png";

const SizeHandle = ({ newProduct, detailProduct, toDetail }) => {
  const [size, setSize] = useState("");
  const addSize = () => {
    const newSize = {
      product_id: detailProduct.id,
      size: size,
    };
    axios
      .post("http://localhost:8000/size", newSize, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setSize("");
        toDetail(detailProduct.id);
      })
      .catch((err) => {
        alert("Your must be relog in");
        console.log(err);
      });
  };
  console.log(size);
  console.log(detailProduct.sizes);
  console.log(newProduct);
  const delSize = (id) => {
    axios
      .delete(`http://localhost:8000/size/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toDetail(detailProduct.id);
      })
      .catch((err) => {
        alert("Your must be relog in");
        console.log(err);
      });
  };
  return (
    <div className="marg row d-flex justify-content-center">
      <div className="col-2">
        <p>Sizes</p>
      </div>
      <div className="col-8 d-flex justify-content-start">
        {detailProduct.sizes &&
          detailProduct.sizes.map((e, index) => {
            return (
              <button className="sizeBtn">
                {e.size}{" "}
                <img src={delIcon} width="20px" onClick={() => delSize(e.id)} />
              </button>
            );
          })}
        {}
        <input
          placeholder="Add size..."
          className="sizeBtn"
          value={size.charAt(0).toUpperCase() + size.slice(1)}
          onChange={(e) => setSize(e.target.value)}
          onSubmit={() => addSize()}
        />
        {(size === "Small" ||
          size === "Medium" ||
          size === "Large" ||
          size === "Extra large") && (
          <button onClick={() => addSize()} className="sizeBtn2">
            <b>+</b>
          </button>
        )}
      </div>
    </div>
  );
};

const mapStatetoProps = (props) => {
  return {
    newProduct: props.product.newProduct,
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
});

export default connect(mapStatetoProps, mapDispatchtoProps)(SizeHandle);
