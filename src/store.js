import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import product from "./components/reducer/Reducer";
import thunk from "redux-thunk";

const root = combineReducers({ product });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(root, composeEnhancers(applyMiddleware(thunk)));

export default store;
