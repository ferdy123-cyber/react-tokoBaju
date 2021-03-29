import { Link } from "react-router-dom";
import edt from "../../img/pencil.png";
import del from "../../img/delete (1).png";
import { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import errImg from "../../img/error-image-generic.png";
import UserNavbar from "../navbar/usernavbar";

const MyProduct = ({ getProduct, data }) => {
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  console.log(data);

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
      <UserNavbar />
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
                        <img
                          className="n rounded"
                          src={e.images[0].url}
                          alt="productImg"
                        />
                      )}
                      {e.images.length === 0 && (
                        <img
                          className="n rounded"
                          src={errImg}
                          alt="productImg"
                        />
                      )}
                      <Link to={`/seller/my-product/${e.id}`}>
                        <p className="delBtn">
                          <img src={edt} alt="editImg" />
                        </p>
                      </Link>
                      <p className="delBtn">
                        <img src={del} onClick={() => rmv(e.id)} alt="dltImg" />
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
