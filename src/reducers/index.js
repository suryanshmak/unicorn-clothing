import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import shopReducer from "./shopReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const perisistedReducer = persistReducer(
  persistConfig,
  combineReducers({ auth: authReducer, cart: cartReducer, shop: shopReducer })
);

export default perisistedReducer;
