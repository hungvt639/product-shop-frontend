import { CombinedState, createStore } from "redux";
import { Color } from "../api/repository/colorAPI";
import { Product } from "../api/repository/productAPI";
import { Type } from "../api/repository/typeAPI";
import reducer from "./reduces";

const store = createStore<CombinedState<AppState>, Action, unknown, unknown>(
    reducer,
    undefined
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

//State gốc
export interface AppState {
    cart: CartState;
}

export interface CartState {
    carts: Cart[];
    isLoad: boolean;
}

export interface Action {
    type: string;
    carts?: Cart[];
    cart?: Cart;
    index?: number;
    amount?: number;
}

export interface Cart {
    product: CartProduct;
    amount: number;
    size: string;
    color: Color;
}

export class CartProduct {
    _id: string;
    name: string;
    img: string;
    img1: string;
    price: number;
    type: Type;
    isSale: boolean;
    slug: string;
    constructor(p: Product | CartProduct) {
        this._id = p._id;
        this.name = p.name;
        this.img = p.img;
        this.img1 = p.img1;
        this.price = p.price;
        this.type = p.type;
        this.isSale = p.isSale;
        this.slug = p.slug;
    }
}

export default store;
