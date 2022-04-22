import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../api";
import { OrderProducts } from "../api/repository/orderAPI";
import route from "../config/route";
import _env from "../config/_env";
import notify from "../container/notify";
import { AppState } from "../store";
import action from "../store/actions";
import { errorAPI } from "../utils/error";
import useAddress from "./useAddress";

const useCheckout = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { addressValue, districts, provincials, setAddressValue, wards } =
        useAddress();

    const [checkout, setCheckout] = useState(0);
    const [ship, setShip] = useState<number>();
    const carts = useSelector((s: AppState) => s.cart.carts);
    const [values, setValues] = useState({
        fullname: "",
        email: "",
        address: "",
        phone: "",
        note: "",
    });

    const createOrder = useCallback(async () => {
        const address = `${values.address}, ${addressValue.ward?.full_name}`;
        if (carts.length && values.fullname && address && values.phone) {
            try {
                const orderProducts = carts.map(
                    (cart) => new OrderProducts(cart)
                );
                const res = await API.order.create({
                    orderProducts,
                    ...values,
                    address,
                });
                dispatch(action.clearCart());
                notify.success("Đơn hàng của bạn đã được tạo thành công");
                router.push(`${route.ORDER}/${res.data._id}`);
            } catch (e) {
                errorAPI(e);
            }
        }
    }, [addressValue.ward?.full_name, carts, dispatch, router, values]);

    return {
        checkout,
        setCheckout,
        ship,
        setShip,
        values,
        setValues,
        createOrder,
        addressValue,
        districts,
        provincials,
        setAddressValue,
        wards,
    };
};
export default useCheckout;
