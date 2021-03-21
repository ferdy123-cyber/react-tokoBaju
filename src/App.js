import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import AdminRoute from "./components/adminRoute";
import UserRoute from "./components/userRouter";
import Home from "./components/home/home";
import Shop from "./components/list-product/list-product";
import Product from "./components/detail-product/product";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import AdminPage from "./components/admin/adminPage";
import AddProduct from "./components/admin/add-product";
import MyProduct from "./components/admin/myProduct";
import Edit from "./components/admin/editRemoveProduct";
import Chart from "./components/shop/chart";
import Payment from "./components/shop/payment";

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Shop} path="/shop" exact />
        <Route component={Product} path="/product/:id" exact />
        <Route component={Register} path="/register" exact />
        <Route component={Login} path="/login" exact />
        <AdminRoute component={AdminPage} path="/seller" exact />
        <AdminRoute component={AddProduct} path="/seller/add-product" exact />
        <AdminRoute component={MyProduct} path="/seller/my-product" exact />
        <AdminRoute component={Edit} path="/seller/my-product/:id" exact />
        <UserRoute component={Chart} path="/cart/:id" exact />
        <UserRoute component={Payment} path="/payment" exact />
      </Switch>
    </Router>
  );
}

export default App;
