import axios from "axios";
import { useState } from "react";
import { Check } from "react-bootstrap-icons";
import { connect } from "react-redux";

const SizeHandle = ({ newProduct }) => {
  const [chek, setChek] = useState(false);
  const [chek2, setChek2] = useState(false);
  const [chek3, setChek3] = useState(false);
  const [chek4, setChek4] = useState(false);
  console.log(newProduct.id);
  const small = async (val) => {
    const newSize = {
      product_id: newProduct.id,
      size: val,
    };
    if (chek === false) {
      setChek(true);
      try {
        axios
          .post("http://localhost:8000/size", newSize, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            localStorage.setItem("sizeIdSmall", response.data.data.id);
          });
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        } else {
          alert(error.message.error);
        }
      }
    }
    if (chek === true) {
      setChek(false);
      try {
        axios.delete(
          `http://localhost:8000/size/${localStorage.getItem("sizeIdSmall")}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        localStorage.setItem("sizeIdSmall", "");
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        } else {
          alert(error.message.error);
        }
      }
    }
  };
  const medium = async (val) => {
    const newSize = {
      product_id: newProduct.id,
      size: val,
    };
    if (chek2 === false) {
      setChek2(true);
      try {
        axios
          .post("http://localhost:8000/size", newSize, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            localStorage.setItem("sizeIdMedium", response.data.data.id);
          });
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        } else {
          alert(error.message.error);
        }
      }
    }
    if (chek2 === true) {
      setChek2(false);
      try {
        axios.delete(
          `http://localhost:8000/size/${localStorage.getItem("sizeIdMedium")}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        localStorage.removeItem("sizeIdMedium");
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        } else {
          alert(error.message.error);
        }
      }
    }
  };
  const large = async (val) => {
    const newSize = {
      product_id: newProduct.id,
      size: val,
    };
    if (chek3 === false) {
      setChek3(true);
      try {
        axios
          .post("http://localhost:8000/size", newSize, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            localStorage.setItem("sizeIdLarge", response.data.data.id);
          });
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        } else {
          alert(error.message.error);
        }
      }
    }
    if (chek3 === true) {
      setChek3(false);
      try {
        axios.delete(
          `http://localhost:8000/size/${localStorage.getItem("sizeIdLarge")}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        localStorage.removeItem("sizeIdLarge");
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        } else {
          alert(error.message.error);
        }
      }
    }
  };
  const extralarge = async (val) => {
    const newSize = {
      product_id: newProduct.id,
      size: val,
    };
    if (chek4 === false) {
      setChek4(true);
      try {
        axios
          .post("http://localhost:8000/size", newSize, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            localStorage.setItem("sizeIdxLarge", response.data.data.id);
          });
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        } else {
          alert(error.message.error);
        }
      }
    }
    if (chek4 === true) {
      setChek4(false);
      try {
        axios.delete(
          `http://localhost:8000/size/${localStorage.getItem("sizeIdxLarge")}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        localStorage.removeItem("sizeIdxLarge");
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        } else {
          alert(error.message.error);
        }
      }
    }
  };
  console.log(newProduct);
  return (
    <div className="marg row d-flex justify-content-center">
      <div className="col-3">
        <p>Sizes</p>
      </div>
      <div className="col-8 d-flex justify-content-start">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox2"
            value="Small"
            onClick={(e) => small(e.target.value)}
            checked={chek}
          />
          <label class="form-check-label" for="inlineCheckbox2">
            Small
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox3"
            value="Medium"
            onClick={(e) => medium(e.target.value)}
            checked={chek2}
          />
          <label class="form-check-label" for="inlineCheckbox3">
            Medium
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox3"
            value="Large"
            onClick={(e) => large(e.target.value)}
            checked={chek3}
          />
          <label class="form-check-label" for="inlineCheckbox3">
            Large
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox3"
            value="Extra large"
            onClick={(e) => extralarge(e.target.value)}
            checked={chek4}
          />
          <label class="form-check-label" for="inlineCheckbox3">
            Extra large
          </label>
        </div>
      </div>
    </div>
  );
};

const mapStatetoProps = (props) => {
  return {
    newProduct: props.product.newProduct,
  };
};

export default connect(mapStatetoProps)(SizeHandle);
