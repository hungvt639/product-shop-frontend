import { CombinedState, createStore } from "redux";
import { Color } from "../api/repository/colorAPI";
import { Product } from "../api/repository/productAPI";
import reducer from "./reduces";

const store = createStore<CombinedState<AppState>, Action, unknown, unknown>(
    reducer,
    undefined
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

//State gốc
export interface AppState {
    cart: Cart[];
}

export interface Action {
    type: string;
    carts?: Cart[];
    cart?: Cart;
    index?: number;
    amount?: number;
}

export interface Cart {
    product: Product;
    amount: number;
    size: string;
    color: Color;
}

export default store;
