import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import action from "../store/actions";

const useCart = () => {
    const dispatch = useDispatch();

    const isLoad = useSelector((s: AppState) => s.cart.isLoad);
    const carts = useSelector((s: AppState) => s.cart.carts);

    const reomteInCart = useCallback(
        (index: number) => {
            dispatch(action.removeIndex(index));
        },
        [dispatch]
    );

    const changeAmount = useCallback(
        (index: number, amount: number) => {
            if (amount > 0) dispatch(action.updateAmount(index, amount));
        },
        [dispatch]
    );
    useEffect(() => {
        dispatch(
            action.createCart(JSON.parse(localStorage.getItem("carts") ?? "[]"))
        );
    }, [dispatch]);

    useEffect(() => {
        if (isLoad) {
            localStorage.setItem("carts", JSON.stringify(carts));
        }
    }, [carts, isLoad]);

    return { reomteInCart, changeAmount };
};
export default useCart;
