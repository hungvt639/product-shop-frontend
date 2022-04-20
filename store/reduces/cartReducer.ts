// import cookies from "next-cookies";
import { Reducer } from "redux";
import { Action, CartState } from "..";
import _types from "../_types";

const initialState: CartState = { carts: [], isLoad: false };

const cartReduce: Reducer<CartState, Action> = (
    state: CartState = initialState,
    action: Action
): CartState => {
    switch (action.type) {
        case _types.SET_CART:
            return { ...state, carts: action.carts ?? [] };
        case _types.CREATE_CART:
            return { isLoad: true, carts: action.carts ?? [] };
        case _types.ADD_CART:
            return {
                ...state,
                carts: action.cart
                    ? [...state.carts, action.cart]
                    : state.carts,
            };
        case _types.UPDATE_AMOUNT:
            return {
                ...state,
                carts:
                    typeof action.index === "undefined"
                        ? state.carts
                        : action.amount
                        ? [
                              ...state.carts.slice(0, action.index),
                              {
                                  ...state.carts[action.index],
                                  amount: action.amount,
                              },
                              ...state.carts.slice(action.index + 1),
                          ]
                        : [
                              ...state.carts.slice(0, action.index),
                              ...state.carts.slice(action.index + 1),
                          ],
            };
        case _types.REMOVE_INDEX:
            return {
                ...state,
                carts:
                    typeof action.index !== "undefined"
                        ? [
                              ...state.carts.slice(0, action.index),
                              ...state.carts.slice(action.index + 1),
                          ]
                        : state.carts,
            };
        case _types.CLEAR_CART:
            return { ...state, carts: [] };
        default:
            return state;
    }
};
export default cartReduce;
