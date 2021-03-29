import "../home/home.css";
import { Link } from "react-router-dom";
import UserNavbar from "../navbar/usernavbar";

const Home = () => {
  if (!localStorage.getItem("login")) {
    localStorage.setItem("login", "false");
  }
  return (
    <div className=" div1">
      <UserNavbar />
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
              <p>LATEST</p>
            </li>
            <li className="list1">
              <p>ALL</p>
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
