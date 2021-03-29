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
import History from "./components/shop/historyShop";
import UserNavbar from "./components/navbar/usernavbar";
import NewOrder from "./components/admin/newOrder";
import OrderComplete from "./components/admin/OrderComplete";
import DetailTransaction from "./components/shop/detailTransaction";
import complainOrder from "./components/admin/orderComplain";

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Shop} path="/shop" exact />
        <Route component={Product} path="/product/:id" exact />
        <Route component={Register} path="/register" exact />
        <Route component={Login} path="/login" exact />
        <Route component={UserNavbar} path="/nav" exact />
        <AdminRoute component={AdminPage} path="/seller" exact />
        <AdminRoute component={AddProduct} path="/seller/add-product" exact />
        <AdminRoute component={MyProduct} path="/seller/my-product" exact />
        <AdminRoute component={Edit} path="/seller/my-product/:id" exact />
        <AdminRoute
          component={complainOrder}
          path="/seller/complain-order"
          exact
        />
        <AdminRoute component={NewOrder} path="/seller/new-order" exact />
        <AdminRoute
          component={OrderComplete}
          path="/seller/order-complete"
          exact
        />
        <UserRoute component={Chart} path="/cart/:id" exact />
        <UserRoute component={Payment} path="/payment/:id" exact />
        <UserRoute component={History} path="/history" exact />
        <UserRoute
          component={DetailTransaction}
          path="/transaction/:id"
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
