import axios from "axios";
import { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, Redirect, useParams } from "react-router-dom";
import "../auth/auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const newUser = {
    full_name: name,
    email: email,
    password: password,
    role: "user",
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/auth/register",
        newUser
      );
      if (res.data.code === 201) {
        alert("succes register");
      } else {
        alert("error register");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.error);
      } else {
        alert(error.message.error);
      }
    }
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
                <a class="nav-link active" aria-current="page">
                  Register
                </a>
              </li>
              <li class="nav-item">
                <Link to="/login">
                  <p class="nav-link">Login</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="formRegister row d-flex justify-content-center">
        <div class="col-8">
          <label for="exampleFormControlInput1" class="form-label">
            Name
          </label>
          <input
            type="name"
            class="form-control"
            id="exampleFormControlInput1"
            maxLength="7"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <button type="button" class="btn btn-dark" onClick={register}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
