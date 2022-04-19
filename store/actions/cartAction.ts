import { Action, Cart } from "..";
import _types from "../_types";

class CartAction {
    public addCart = (cart: Cart): Action => {
        return {
            type: _types.ADD_CART,
            cart,
        };
    };
    public setCart = (carts: Cart[]): Action => {
        return {
            type: _types.ADD_CART,
            carts,
        };
    };
    public clearCart = (): Action => {
        return {
            type: _types.CLEAR_CART,
        };
    };
    public updateAmount = (index: number, amount: number): Action => {
        return {
            type: _types.UPDATE_AMOUNT,
            index,
            amount,
        };
    };
    public removeIndex = (index: number): Action => {
        return {
            type: _types.REMOVE_INDEX,
            index,
        };
    };
}

export default new CartAction();
