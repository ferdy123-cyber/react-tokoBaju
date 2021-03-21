import axios from "axios";
import { useState } from "react";
import { connect } from "react-redux";
import add from "../../img/add-image.png";
import loading from "../../img/5 (1).gif";
const AddImage = ({ newProduct }) => {
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [image2, setImage2] = useState("");
  const [preview2, setPreview2] = useState("");
  console.log(preview2);
  console.log(preview);
  console.log(newProduct);
  const send = (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log(image);
    if (image === "") {
      console.log("image empty");
    } else {
      data.append("product_id", newProduct.id);
      data.append("image", image);
      console.log(data);
      setPreview(loading);
      // const progress = {
      //   onUploadProgress: (progressEvent) => {
      //     const { loaded, total } = progressEvent;
      //     let percent = Math.floor((loaded * 100) / total);
      //     console.log(`${loaded}kb of ${total}kb | ${percent}%`);
      //   },
      // };

      axios
        .post("http://localhost:8000/image/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setPreview(response.data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const send2 = (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log(image2);
    if (image2 === "") {
      console.log("image empty");
    } else {
      data.append("product_id", newProduct.id);
      data.append("image", image2);
      console.log(data);
      setPreview2(loading);

      axios
        .post("http://localhost:8000/image/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setPreview2(response.data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="marg row d-flex justify-content-center">
      <div className="col-3">
        <p>Upload images</p>
      </div>
      <div className="col-8 d-flex justify-content-center">
        {preview === "" && (
          <label className="mright" for="upload" onMouseOut={send}>
            <img src={add} width="100px" height="100px" />
          </label>
        )}
        {preview === loading && (
          <div className="uplProses col-2">
            <img src={preview} />
          </div>
        )}
        {preview !== "" && preview !== loading && (
          <img
            className="roundImg mright"
            src={preview}
            width="100px"
            height="100px"
          />
        )}
        <input
          id="upload"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {preview2 === "" && (
          <label for="upload2" onMouseOut={send2}>
            <img src={add} width="100px" height="100px" />
          </label>
        )}
        {preview2 === loading && (
          <div className="uplProses col-2">
            <img src={preview2} />
          </div>
        )}
        {preview2 !== "" && preview2 !== loading && (
          <img
            className="roundImg"
            src={preview2}
            width="100px"
            height="100px"
          />
        )}
        <input
          id="upload2"
          type="file"
          onChange={(e) => setImage2(e.target.files[0])}
        />
      </div>
    </div>
  );
};

const mapStatetoProps = (props) => {
  return {
    newProduct: props.product.newProduct,
  };
};

export default connect(mapStatetoProps)(AddImage);
