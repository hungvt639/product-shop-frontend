/* eslint-disable @next/next/no-img-element */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineLine, AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineCheckCircle } from "react-icons/md";
import Cod from "../public/img/cod.svg";

type PaymentMethodsProps = {
    ship?: number;
    setShip: Dispatch<SetStateAction<number | undefined>>;
    createOrder: () => Promise<void>;
};

const PaymentMethodsComponent = (props: PaymentMethodsProps) => {
    const { ship, setShip, createOrder } = props;
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (!loading) {
            setLoading(true);
            await createOrder();
            setLoading(false);
        }
    };

    useEffect(() => {
        setShip(30000);
    }, [setShip]);

    return (
        <div className="text-base">
            <h1 className="text-base font-bold">Phương thức vận chuyển</h1>
            <div className="flex justify-between items-center border border-solid border-neutral-300 px-5 py-5 rounded mt-2">
                <div className="flex items-center">
                    <MdOutlineCheckCircle className="text-cyan-600 font-bold text-2xl mr-2 cursor-pointer" />
                    <span>Mặc định</span>
                </div>
                <div>
                    {ship ? (
                        ship.toLocaleString("vi-VN") + "₫"
                    ) : (
                        <AiOutlineLine />
                    )}
                </div>
            </div>
            <h1 className="text-base font-bold mt-10">
                Phương thức vận chuyển
            </h1>
            <div className="flex items-center border border-solid border-neutral-300 px-5 py-5 rounded mt-2">
                <MdOutlineCheckCircle className="text-cyan-600 font-bold text-2xl mr-2 cursor-pointer" />
                <Cod className="mr-2" />
                <span>Thanh toán khi giao hàng (COD)</span>
            </div>

            <div className="mt-5 flex justify-between items-center">
                <p className="cursor-pointer">Quay lại thông tin giao hàng</p>
                <button
                    onClick={submit}
                    className="w-64 py-4 rounded text-white bg-sky-600"
                >
                    {loading ? (
                        <AiOutlineLoading3Quarters className="text-2xl font-bold mx-auto _loading" />
                    ) : (
                        "Hoàn tất đơn hàng"
                    )}
                </button>
            </div>
        </div>
    );
};

export default PaymentMethodsComponent;
