import { createStore } from "redux";
import LoginReducer from "./LoginReducer";
import {composeWithDevTools} from "redux-devtools-extension"

const store=createStore(LoginReducer,composeWithDevTools());

export default store;