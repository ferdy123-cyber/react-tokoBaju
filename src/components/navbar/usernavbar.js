import { Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import UserManage from "../user-manage";
import chek from "../../img/checkout.png";
import notif from "../../img/bell.png";
import "../navbar/style.css";
import { connect } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";

const UserNavbar = ({
  getTransaction,
  getTransactionById,
  transaction,
  transactionById,
  totalQty,
  getProduct,
  data,
  allTransaction,
  getAllTransaction,
}) => {
  useEffect(() => {
    getTransaction();
  }, [getTransaction]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const empty = () => {
    alert("Your cart is empty, lets shop!!");
  };

  const [Input, setInput] = useState("");

  const Pending =
    transaction && transaction.filter((e) => e.status === "Pending");

  const newOrder = allTransaction.filter((e) => e.status === "Paid");
  const complainOrder = allTransaction.filter((e) => e.status === "Canceling");
  const totalNotif = newOrder.length + complainOrder.length;

  const logedIn = localStorage.getItem("login");
  return (
    <div className="row d-flex justify-content-center">
      <Navbar
        className="shadow-sm p-3 mb-5 bg-body rounded fixed-top"
        bg="light"
        variant="light"
      >
        <Navbar.Brand className="brand">Fashion shop</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/shop">Shop</Nav.Link>
          {localStorage.getItem("role") === "admin" && (
            <Nav.Link href="/seller">Dashboard</Nav.Link>
          )}
          {localStorage.getItem("role") === "admin" && (
            <Nav.Link href="/seller/my-product">Product</Nav.Link>
          )}
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
            className="mr-sm-2"
          />
          {logedIn === "true" && <UserManage />}
          {logedIn === "true" &&
            localStorage.getItem("role") === "user" &&
            Pending.map((e) => e.id).length !== 0 && (
              <a href={`/cart/${Pending.map((e) => e.id)}`}>
                <img className="cart1" src={chek} width="25px" alt="cart" />
                <span class="bdg4 badge rounded-pill bg-danger">!</span>
              </a>
            )}

          {logedIn === "true" &&
            localStorage.getItem("role") === "user" &&
            Pending.map((e) => e.id).length === 0 && (
              <img
                onClick={() => empty()}
                className="cart1"
                src={chek}
                width="25px"
                alt="cart"
              />
            )}

          {logedIn === "true" && localStorage.getItem("role") === "admin" && (
            <NavDropdown
              className=" username"
              title={
                <span>
                  <img className="cart1" src={notif} width="25px" alt="cart" />
                  <span class="bdg2 badge bg-danger">{totalNotif}</span>
                </span>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/seller/new-order">
                New orders{" "}
                <span class="bdg3 badge bg-danger">{newOrder.length}</span>
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="/seller/complain-order">
                Complain{" "}
                <span class="bdg3 badge bg-danger">{complainOrder.length}</span>
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="/seller/my-product">
                Chat <span class="bdg3 badge bg-danger">4</span>
              </NavDropdown.Item>
            </NavDropdown>
          )}

          {logedIn === "false" && <Nav.Link href="/login">Login</Nav.Link>}
        </Form>
      </Navbar>
      {Input !== "" && (
        <div className="searchBar2 col-12 row d-flex justify-content-end fixed-top">
          <div className="result col-4 row shadow-sm p-3 bg-body rounded">
            <p className="judul col-11">Search result</p>
            <div className="jarak col-11"></div>
            {data &&
              data
                .filter((e) => {
                  if (Input === "") {
                    return e;
                  } else {
                    return (
                      e.name.toLowerCase().includes(Input.toLowerCase()) ||
                      e.chategory.toLowerCase().includes(Input.toLowerCase())
                    );
                  }
                })
                .map((e) => {
                  return (
                    <a
                      href={`/product/${e.id}`}
                      className="listResult col-12 row"
                    >
                      <div className="col-3">
                        <img src={e.images[0].url} alt="..." />
                      </div>
                      <div className="col-9">
                        <p className="titleResult">{e.name}</p>
                        <p>
                          IDR{" "}
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
                      </div>
                    </a>
                  );
                })}
          </div>
        </div>
      )}
      {}
    </div>
  );
};

const mapStatetoProps = (props) => {
  return {
    data: props.product.data,
    totalQty: props.product.totalQty,
    transaction: props.product.transaction,
    transactionById: props.product.transactionById,
    allTransaction: props.product.allTransaction,
  };
};

const mapDispatchtoProps = (dispatch) => ({
  getTransaction: () =>
    axios
      .get("http://localhost:8000/transaction", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) =>
        dispatch({
          type: "GET_TRANSACTION",
          value: response.data.data,
        })
      ),
  getTransactionById: (id) =>
    axios
      .get(`http://localhost:8000/transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) =>
        dispatch({
          type: "GET_TRANSACTION_byID",
          value: response.data.data,
          value2: response.data.totalQty,
        })
      ),

  getProduct: () =>
    axios.get("http://localhost:8000/product").then((response) =>
      dispatch({
        type: "GET_PRODUCT",
        value: response.data.data,
      })
    ),
  getAllTransaction: () =>
    axios
      .get("http://localhost:8000/transaction/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) =>
        dispatch({
          type: "ALL_TRANSACTION",
          value: response.data.data,
        })
      )
      .catch((err) => {
        alert(err.response.data.message);
      }),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(UserNavbar);
