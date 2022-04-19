import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../api/repository/productAPI";
import notify from "../container/notify";
import { AppState } from "../store";
import action from "../store/actions";

const useProduct = (product?: Product) => {
    const dispatch = useDispatch();

    const carts = useSelector((s: AppState) => s.cart);
    const [size, setSize] = useState(product?.sizes[0] ?? "");
    const [color, setColor] = useState(product?.colors[0] ?? undefined);
    const [amount, setAmount] = useState(1);

    const changeAmount = useCallback((value: number) => {
        if (value <= 0) {
            setAmount(1);
            return;
        }
        setAmount(value);
    }, []);

    const addToCart = useCallback(
        (product: Product) => {
            if (size && color && amount) {
                const index = carts.findIndex(
                    (c) =>
                        c.product._id === product._id &&
                        c.color._id === color._id &&
                        c.size === size
                );
                if (index >= 0) {
                    dispatch(
                        action.updateAmount(index, amount + carts[index].amount)
                    );
                } else {
                    dispatch(action.addCart({ product, amount, color, size }));
                }
                notify.success("Thêm vào giỏ hàng thành công");
            }
        },
        [amount, carts, color, dispatch, size]
    );

    return { size, setSize, color, setColor, amount, changeAmount, addToCart };
};
export default useProduct;
