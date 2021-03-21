import axios from "axios";
import { useState } from "react";
import { connect } from "react-redux";
import add from "../../img/add-image.png";
import loading from "../../img/5 (1).gif";
const AddImage = ({ detailProduct, toDetail, match }) => {
  const [image, setImage] = useState("");
  //   const [image2, setImage2] = useState("");
  const [preview, setPreview] = useState("");

  //   console.log(preview2);
  //   console.log(preview);
  //   console.log(detailProduct);
  const send = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (image === "") {
      console.log("image empty");
    } else {
      data.append("product_id", detailProduct.id);
      data.append("image", image);
      console.log(data);
      setImage("");
      setPreview(loading);

      axios
        .post("http://localhost:8000/image/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setPreview("");
          toDetail(detailProduct.id);
          console.log(response.data.url);
        })
        .catch((err) => {
          alert("your must be relog in");
          console.log(err);
        });
    }
  };

  const deleteImg = (id) => {
    axios
      .delete(`http://localhost:8000/image/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toDetail(detailProduct.id);
      })
      .catch((err) => {
        alert("Try relog in");
        console.log(err);
      });
  };
  return (
    <div className="cnt row d-flex justify-content-center">
      {detailProduct.images &&
        detailProduct.images.map((e) => {
          return (
            <label className="col-2">
              <img src={e.url} className="img-thumbnail" />
              <button
                onClick={() => deleteImg(e.id)}
                className="delImg btn btn-dark"
              >
                <p>Delete</p>
              </button>
            </label>
          );
        })}
      {preview !== "" && (
        <div className="uplProses col-2">
          <img src={preview} />
        </div>
      )}
      {preview === "" && (
        <label className="col-2" for="upload" onMouseOut={send}>
          <img src={add} width="100px" height="100px" />
        </label>
      )}
      <input
        id="upload"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
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
});

export default connect(mapStatetoProps, mapDispatchtoProps)(AddImage);
