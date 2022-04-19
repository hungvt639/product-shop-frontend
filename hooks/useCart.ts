import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import action from "../store/actions";
import utils from "../utils";

const useCart = () => {
    const dispatch = useDispatch();
    const carts = useSelector((s: AppState) => s.cart);
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
    //     if (typeof window !== "undefined") {
    //         console.log("it", localStorage.getItem("carts") ?? "[]");

    //         // dispatch(
    //         //     action.setCart(
    //         //         JSON.parse(localStorage.getItem("carts") ?? "[]")
    //         //     )
    //         // );
    //     }
    // }, [dispatch]);
    // useEffect(() => {
    //     const cs = carts.map((c) => {
    //         const { _id, img, price, name, slug, type, isSale } = c.product;
    //         return {
    //             ...c,
    //             product: { _id, img, price, name, slug, type, isSale },
    //         };
    //     });
    //     utils.setItemStorage("carts", cs);
    // }, [carts]);
    return { reomteInCart, changeAmount };
};
export default useCart;
