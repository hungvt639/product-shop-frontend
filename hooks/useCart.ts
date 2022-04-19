import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import action from "../store/actions";

const useCart = () => {
    const dispatch = useDispatch();
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
    // useEffect(() => {
    //     dispatch(
    //         action.setCart(JSON.parse(localStorage.getItem("carts") ?? "[]"))
    //     );
    // }, [dispatch]);

    return { reomteInCart, changeAmount };
};
export default useCart;
