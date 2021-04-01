import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "../chat/style.css";
import moment from "moment";

const Chat = ({
  getAllChat,
  getRoomChat,
  chat,
  roomChat,
  match,
  detailProduct,
}) => {
  useEffect(() => {
    getRoomChat();
  }, [getRoomChat]);
  useEffect(() => {
    getAllChat();
  }, [getAllChat]);

  const chats = chat.filter((e) => e.chat_id === roomChat[0].id);
  console.log(chats);

  const [input, setInput] = useState(
    `Product with this name(${detailProduct.name})`
  );

  const addChat = (newChat) => {
    axios
      .post(`http://localhost:8000/listchat`, newChat, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        getAllChat();
        setInput("");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  console.log(detailProduct.id);
  return (
    <div className="searchBar2 col-12 row d-flex justify-content-end fixed-top">
      <div className="chatResult col-4 row shadow-sm p-3 bg-body rounded">
        <div className="judul col-12 row">
          <p className="ats col-8">Chat seller</p>
          <a
            href={`/product/${detailProduct.id}`}
            className="textKanan ats col-4"
          >
            exit
          </a>
          <div className="chatLand col-12 ">
            {chats &&
              chats
                .sort(
                  (a, b) =>
                    new moment(a.updatedAt).format("YYYYMMDDhhmmss") -
                    new moment(b.updatedAt).format("YYYYMMDDhhmmss")
                )
                .map((e) => {
                  return (
                    <div className=" hgtP col-12">
                      {localStorage.getItem("name") === e.user_name && (
                        <p className="textKanan alert alert-success">
                          {e.chat}
                          <span>
                            {"   "} ({moment(e.createdAt).format("hh:mm")})
                          </span>
                        </p>
                      )}
                      {localStorage.getItem("name") !== e.user_name && (
                        <p className="alert alert-success">
                          {e.chat}
                          <span>
                            {"   "} ({moment(e.createdAt).format("hh:ss")})
                          </span>
                        </p>
                      )}
                    </div>
                  );
                })}
          </div>
          <div class="inptChat col-8">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <button
            className="col-2 btn btn-secondary"
            onClick={() =>
              addChat({
                chat_id: roomChat[0].id,
                chat: input,
              })
            }
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStatetoProps = (props) => {
  return {
    chat: props.product.chat,
    roomChat: props.product.roomChat,
    user: props.product.user,
    detailProduct: props.product.detailProduct,
  };
};

const mapDispatchtoProps = (dispatch) => ({
  getRoomChat: () =>
    axios
      .get(`http://localhost:8000/chat`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) =>
        dispatch({
          type: "GET_ROOM_CHAT",
          value: response.data.data,
        })
      ),
  getUser: () =>
    axios.get("http://localhost:8000/auth/get").then((response) =>
      dispatch({
        type: "GET_USER",
        value: response.data.data,
      })
    ),
  getAllChat: () =>
    axios.get("http://localhost:8000/listchat").then((response) =>
      dispatch({
        type: "GET_ALL_CHAT",
        value: response.data.data,
      })
    ),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Chat);
