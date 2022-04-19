import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../api";
import { OrderProducts } from "../api/repository/orderAPI";
import route from "../config/route";
import notify from "../container/notify";
import { AppState } from "../store";
import action from "../store/actions";
import { errorAPI } from "../utils/error";

const useCheckout = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [checkout, setCheckout] = useState(0);
    const [ship, setShip] = useState<number>();
    const carts = useSelector((s: AppState) => s.cart);
    const [values, setValues] = useState({
        fullname: "",
        email: "",
        address: "",
        phone: "",
        note: "",
    });

    const createOrder = useCallback(async () => {
        if (carts.length && values.fullname && values.address && values.phone) {
            try {
                const orderProducts = carts.map(
                    (cart) => new OrderProducts(cart)
                );
                const res = await API.order.create({
                    orderProducts,
                    ...values,
                });
                dispatch(action.clearCart());
                notify.success("Đơn hàng của bạn đã được tạo thành công");
                router.push(`${route.ORDER}/${res.data._id}`);
            } catch (e) {
                errorAPI(e);
            }
        }
    }, [carts, dispatch, router, values]);

    return {
        checkout,
        setCheckout,
        ship,
        setShip,
        values,
        setValues,
        createOrder,
    };
};
export default useCheckout;
