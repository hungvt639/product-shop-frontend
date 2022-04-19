import { NextPage } from "next";
import Link from "next/link";
import { useSelector } from "react-redux";
import API from "../api";
import { Type } from "../api/repository/typeAPI";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import route from "../config/route";
import useCheckout from "../hooks/useCheckout";
import { AppState } from "../store";
import { BsChevronRight } from "react-icons/bs";
import ProductCheckout from "../components/ProductCheckout";
import ShipmentDetails from "../components/ShipmentDetails";
import PaymentMethods from "../components/PaymentMethods";
type CheckoutProps = {
    types?: Type[];
};
const CheckoutComponent: NextPage<CheckoutProps> = ({ types }) => {
    const carts = useSelector((s: AppState) => s.cart);
    const {
        checkout,
        setCheckout,
        setShip,
        ship,
        setValues,
        values,
        createOrder,
    } = useCheckout();
    return (
        <>
            <Header types={types ?? []} />
            <div className="_max-width flex items-center text-base">
                <Link href={route.CART}>
                    <a className="mr-2 text-blue-600">Giỏ hàng</a>
                </Link>
                <BsChevronRight />
                <span
                    onClick={() => setCheckout(0)}
                    className={`cursor-pointer mx-2${
                        checkout !== 0 ? " text-blue-600" : ""
                    }`}
                >
                    Thông tin giao hàng
                </span>
                <BsChevronRight />
                <span
                    className={`cursor-pointer ml-2${
                        checkout !== 1 ? " text-blue-600" : ""
                    }`}
                >
                    Phương thức thanh toán
                </span>
            </div>
            <div className="_max-width flex _checkout w-full mt-5 mb-16">
                <div className="_left pr-10">
                    {checkout === 0 ? (
                        <div>
                            <h1 className="text-base font-bold">
                                Thông tin giao hàng
                            </h1>

                            <ShipmentDetails
                                values={values}
                                setValues={setValues}
                                setCheckout={setCheckout}
                            />
                        </div>
                    ) : (
                        <div>
                            <PaymentMethods
                                setShip={setShip}
                                ship={ship}
                                createOrder={createOrder}
                            />
                        </div>
                    )}
                </div>
                <div className="_right pl-5 border-l border-solid border-neutral-400">
                    <ProductCheckout carts={carts} ship={ship} />
                </div>
            </div>
            <Footer />
        </>
    );
};

CheckoutComponent.getInitialProps = async () => {
    try {
        const res = await API.type.gets();
        return { types: res.data };
    } catch {
        return {};
    }
};

export default CheckoutComponent;
