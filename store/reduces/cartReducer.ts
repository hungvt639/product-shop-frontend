// import cookies from "next-cookies";
import { Reducer } from "redux";
import { Action, Cart } from "..";
import _types from "../_types";

const initialState: Cart[] = [];

const cartReduce: Reducer<Cart[], Action> = (
    state: Cart[] = initialState,
    action: Action
): Cart[] => {
    switch (action.type) {
        case _types.SET_CART:
            return action.carts ?? [];
        case _types.ADD_CART:
            return action.cart ? [...state, action.cart] : state;
        case _types.UPDATE_AMOUNT:
            return typeof action.index === "undefined"
                ? state
                : action.amount
                ? [
                      ...state.slice(0, action.index),
                      { ...state[action.index], amount: action.amount },
                      ...state.slice(action.index + 1),
                  ]
                : [
                      ...state.slice(0, action.index),
                      ...state.slice(action.index + 1),
                  ];
        case _types.REMOVE_INDEX:
            return typeof action.index !== "undefined"
                ? [
                      ...state.slice(0, action.index),
                      ...state.slice(action.index + 1),
                  ]
                : state;
        case _types.CLEAR_CART:
            return [];
        default:
            return state;
    }
};
export default cartReduce;
