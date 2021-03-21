import { Redirect } from "react-router";

const initialState = {
  user: {
    login_as: "",
    name: "",
    token: "",
  },
  data: [],
  detailProduct: {
    price: 0,
    discount: 0,
  },
  newProduct: {
    id: "",
    name: "",
    description: "",
    stock: 0,
    price: 0,
    discount: 0,
    sex: "",
    color: "",
  },
  transaction: [],
  transactionById: {
    id: "",
    product_price: 0,
    product_discount: 0,
    product_qty: 0,
    total_payment: 0,
    orders: [],
  },
  allTransaction: [],
};

const productReducer = (state = initialState, action) => {
  if (action.type === "LOGIN") {
    localStorage.setItem("token", action.value.token);
    localStorage.setItem("login", JSON.stringify(true));
    return {
      ...state,
      user: action.value,
    };
  }
  if (action.type === "DETAIL_PRODUCT") {
    return {
      ...state,
      detailProduct: action.value,
    };
  }
  if (action.type === "GET_PRODUCT") {
    return {
      ...state,
      data: action.value,
    };
  }
  if (action.type === "ADD_PRODUCT") {
    return {
      ...state,
      newProduct: action.value,
    };
  }
  if (action.type === "UPDATE_PRODUCT") {
    alert("Succes update product");
  }
  if (action.type === "DELETE") {
    alert("Succes delete product");
  }
  if (action.type === "GET_TRANSACTION") {
    return {
      ...state,
      transaction: action.value,
    };
  }
  if (action.type === "GET_TRANSACTION_byID") {
    return {
      ...state,
      transactionById: action.value,
    };
  }
  if (action.type === "ADD_ORDER") {
    console.log(action.value);
  }
  if (action.type === "ALL_TRANSACTION") {
    return {
      ...state,
      allTransaction: action.value,
    };
  }
  return state;
};

export default productReducer;
