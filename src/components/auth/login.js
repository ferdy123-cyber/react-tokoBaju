import { Navbar, Nav } from "react-bootstrap";
import { Link, Redirect, useParams } from "react-router-dom";
import "../auth/auth.css";
import { useState } from "react";
import axios from "axios";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userLogin = {
    email: email,
    password: password,
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/auth/login",
        userLogin
      );
      if (res.data.code === 201) {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("login", JSON.stringify(true));
        localStorage.setItem("role", res.data.data.login_as);
        localStorage.setItem("name", res.data.data.name);
        alert(res.data.message);
        if (localStorage.getItem("role") === "admin") {
          props.history.push("/seller");
        } else {
          props.history.push("/");
        }
      } else {
        alert("login eror");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.error);
      } else {
        alert(error.message.error);
      }
    }
    return <Redirect to="/register" />;
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <p class="navbar-brand user">Welcome</p>
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
                <Link to="/register">
                  <a class="nav-link" aria-current="page">
                    Register
                  </a>
                </Link>
              </li>
              <li class="nav-item active">
                <p class="nav-link">Login</p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="formRegister row d-flex justify-content-center">
        <div class="col-8">
          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="col-8">
          <label for="exampleFormControlInput1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleFormControlInput1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="col-8">
          <button type="button" class="btn btn-dark" onClick={login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
