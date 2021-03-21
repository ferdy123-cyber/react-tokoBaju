import "../home/home.css";
import { Link } from "react-router-dom";
import user from "../../img/user.png";
import UserManage from "../user-manage";

const Home = (props) => {
  if (!localStorage.getItem("login")) {
    localStorage.setItem("login", "false");
  }
  const logedIn = localStorage.getItem("login");
  const userName = localStorage.getItem("name");
  const logout = () => {
    localStorage.setItem("login", "false");
    alert("succes logout");
    props.history.push("/");
  };
  console.log(UserManage);
  return (
    <div className="div1">
      <nav class="nav navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <p class="navbar-brand user">
            {logedIn === "true" && <UserManage />}
            {logedIn === "false" && ""}
          </p>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <Link to="/shop">
                  <p class="nav-link">Shop</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {logedIn === "true" && (
          <button
            class="logoutbtn btn btn-outline-dark"
            type="submit"
            onClick={logout}
          >
            Logout
          </button>
        )}
        {logedIn === "false" && (
          <Link to="/login">
            <button class="loginbtn btn btn-dark" type="submit">
              Login
            </button>
          </Link>
        )}
      </nav>
      <div className="row">
        <div class="col-7 row1">
          <p>
            Choose <b>as you want</b>
          </p>
          <p>
            Pay <b>as you can</b>
          </p>
        </div>
        <div class="col-5 row2">
          <ul className="right">
            <li className="list1">
              <a href="#">LATEST</a>
            </li>
            <li className="list1">
              <a href="#">ALL</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <Link to="/shop">
            <button type="button" className="btnShop btn btn-dark">
              Shop now
            </button>
          </Link>
        </div>
        <div className="col-8 text">
          <p>
            <b>New Consept</b> of Online Shooping
          </p>
        </div>
      </div>
      <div className="row ">
        <div className="col-8"></div>
        <div className="col-4 miniText">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
