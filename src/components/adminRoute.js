import { Route, Redirect } from "react-router-dom";

const AdminRoute = (props) => {
  const isLogin = localStorage.getItem("login");
  const role = localStorage.getItem("role");

  if (isLogin === "true" && role === "admin") {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default AdminRoute;
