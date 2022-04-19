import { combineReducers } from "redux";
import { ReducersMapObject } from "redux";
import cartReduce from "./cartReducer";
import { Action, AppState } from "../../store";

const map: ReducersMapObject<AppState, Action> = {
    cart: cartReduce,
};

const reducer = combineReducers(map);
export default reducer;
