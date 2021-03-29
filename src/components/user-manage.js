import "./home/home.css";
import user from "../img/user.png";
import { NavDropdown, Nav } from "react-bootstrap";

const UserManage = (props) => {
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("name");
  const logedIn = localStorage.getItem("login");
  const logout = () => {
    localStorage.setItem("login", "false");
    alert("succes logout");
  };
  if (logedIn === "true" && role === "admin") {
    return (
      <div className="userIcon">
        <Nav className="mr-auto">
          <Nav.Link href="#link">
            <img src={user} width="25px" height="25px" alt="user" />
          </Nav.Link>
          <NavDropdown
            className="username"
            title={userName}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="/seller">Dashboard</NavDropdown.Item>
            <NavDropdown.Item href="/seller/my-product">
              Products
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout} href="/login">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </div>
    );
  } else {
    return (
      <div className="userIcon">
        <Nav className="mr-auto">
          <Nav.Link href="#link">
            <img src={user} width="25px" height="25px" alt="user" />
          </Nav.Link>
          <NavDropdown
            className="username"
            title={userName}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="/history">Purchasing</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout} href="/login">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </div>
    );
  }
};

export default UserManage;
