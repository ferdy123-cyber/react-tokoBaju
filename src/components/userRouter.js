import { Route, Redirect } from "react-router-dom";

const UserRouter = (props) => {
  const isLogin = localStorage.getItem("login");
  const role = localStorage.getItem("role");

  if (isLogin === "true" && role === "user") {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default UserRouter;
