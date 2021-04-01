import ReactStars from "react-rating-stars-component";
import user from "../../img/user.png";
import axios from "axios";
import { connect } from "react-redux";
import { useEffect } from "react";
import moment from "moment";

const Comment = ({ toDetail, detailProduct, review, getReview }) => {
  useEffect(() => {
    getReview();
  }, [getReview]);
  console.log(review);
  const reviews = review.filter((e) => e.product_id === detailProduct.id);
  console.log(reviews);
  return (
    <div className="review row d-flex justify-content-center shadow p-3 mb-5 bg-body">
      <div className="ttl col-10">Product reviews ({reviews.length})</div>
      {reviews.length === 0 && (
        <div className="column col-10 row justify-content-center">
          <p className="emptyReview">There's no available reviews</p>
        </div>
      )}
      {reviews
        .sort(
          (a, b) =>
            new moment(b.updated_at).format("YYYYMMDDhhmmss") -
            new moment(a.updated_at).format("YYYYMMDDhhmmss")
        )
        .map((e) => {
          return (
            <div className="column col-10 row justify-content-center">
              <div className="col-12 row d-flex justify-content-start">
                <div className="usr col-3 row ">
                  <div className="col-4">
                    <img
                      className="usrImg"
                      src={user}
                      height="50"
                      width="50px"
                      alt="..."
                    />
                  </div>
                  <div className="col-8 row">
                    <p className="name col-10">{e.user_name}</p>
                    <p className="date col-12">
                      {moment(e.updatedAt).calendar()}
                    </p>
                  </div>
                </div>
                <div className="commnt col-8 row">
                  <ReactStars
                    className="rting col-12"
                    count={5}
                    value={e.rating}
                    size={20}
                    activeColor="#ffd700"
                  />
                  <p className="col-12">{e.comment}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

const mapStatetoProps = (props) => {
  return {
    detailProduct: props.product.detailProduct,
    review: props.product.review,
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
  getReview: (productId) =>
    axios.get("http://localhost:8000/review", productId).then((response) =>
      dispatch({
        type: "GET_REVIEW",
        value: response.data.data,
      })
    ),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Comment);
