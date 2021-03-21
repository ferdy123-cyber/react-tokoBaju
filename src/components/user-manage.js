import "./home/home.css";
import { Link } from "react-router-dom";
import user from "../img/user.png";

const UserManage = () => {
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("name");
  const logedIn = localStorage.getItem("login");
  if (logedIn === "true" && role === "admin") {
    return (
      <div className="userIcon">
        <Link to="/seller">
          <img src={user} width="28px" height="28px" />
        </Link>
        <span>{userName}</span>
      </div>
    );
  } else {
    return (
      <div className="userIcon">
        <img src={user} width="28px" height="28px" />
        <span>{userName}</span>
      </div>
    );
  }
};

export default UserManage;
