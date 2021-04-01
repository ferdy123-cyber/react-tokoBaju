import UserNavbar from "../navbar/usernavbar";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";

const AdminChat = ({
  getRoomChat,
  roomChat,
  user,
  getUser,
  getAllChat,
  chat,
}) => {
  useEffect(() => {
    getRoomChat();
  }, [getRoomChat]);
  useEffect(() => {
    getUser();
  }, [getUser]);
  useEffect(() => {
    getAllChat();
  }, [getAllChat]);
  console.log(user);

  const [chatId, setChatId] = useState("");
  const [input, setInput] = useState("");

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
  console.log(chatId);
  return (
    <div className="row d-flex justify-content-center ">
      <UserNavbar />
      <div className="contact col-3 row ">
        <div className="searchContact col-12">
          <input className=" form-control" />
        </div>
        <div className="col-12 row">
          <ul class="lst list-group list-group-flush col-12">
            {roomChat.map((e) => {
              return (
                <li onClick={() => setChatId(e.id)} class="list-group-item">
                  <p className="cntcName">
                    {user
                      .filter((val) => val.id === e.user_id)
                      .map((e) => e.full_name)}
                  </p>
                  <p className="newChat">hallo</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="Chatss col-8">
        {chatId !== "" &&
          chat
            .filter((e) => e.chat_id === chatId)
            .sort(
              (a, b) =>
                new moment(a.updatedAt).format("YYYYMMDDhhmmss") -
                new moment(b.updatedAt).format("YYYYMMDDhhmmss")
            )
            .map((e) => {
              return (
                <div class="list-group">
                  {localStorage.getItem("name") === e.user_name && (
                    <p
                      type="button"
                      class="listchat textKanan list-group-item list-group-item-action"
                    >
                      {e.chat}{" "}
                      <sub className="timeChat">
                        {moment(e.createdAt).format("hh:mm")}
                      </sub>
                    </p>
                  )}
                  {localStorage.getItem("name") !== e.user_name && (
                    <p
                      type="button"
                      class="listchat list-group-item list-group-item-action"
                    >
                      {e.chat}{" "}
                      <sub className="timeChat">
                        {moment(e.createdAt).format("hh:mm")}
                      </sub>
                    </p>
                  )}
                </div>
              );
            })}
        <div className="send1 row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="col-10 form-control"
          />
          <button
            onClick={() =>
              addChat({
                chat_id: chatId,
                chat: input,
              })
            }
            className="col-2 btn btn-secondary"
          >
            Send
          </button>
        </div>
      </div>
      {/* <div className="listChat col-3">
        <ul class="list-group">
          {roomChat.map((e) => {
            return (
              <li
                onClick={() => setChatId(e.id)}
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                {user
                  .filter((val) => val.id === e.user_id)
                  .map((e) => e.full_name)}
                <span class="badge bg-primary rounded-pill">14</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="col-6">
        <div className="admcht chatResult col-4 row shadow-sm p-3 bg-body rounded">
          <div className="judul col-12 row">
            <div className="chatLand col-12 ">
              {chatId !== "" &&
                chat
                  .filter((e) => e.chat_id === chatId)
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
              onClick={() =>
                addChat({
                  chat_id: chatId,
                  chat: input,
                })
              }
              className="col-2 btn btn-secondary"
            >
              send
            </button>
          </div>
        </div>
      </div> */}
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
      .get(`http://localhost:8000/chat/admin`, {
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

export default connect(mapStatetoProps, mapDispatchtoProps)(AdminChat);
