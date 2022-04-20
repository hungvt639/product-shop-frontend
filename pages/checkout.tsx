import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import API from "../api";
import { Type } from "../api/repository/typeAPI";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import PaymentMethods from "../components/PaymentMethods";
import ProductCheckout from "../components/ProductCheckout";
import ShipmentDetails from "../components/ShipmentDetails";
import route from "../config/route";
import _env from "../config/_env";
import useCheckout from "../hooks/useCheckout";
import { AppState } from "../store";

type CheckoutProps = {
    types?: Type[];
    pathname: string;
    asPath?: string;
};

const CheckoutComponent: NextPage<CheckoutProps> = ({
    types,
    pathname,
    asPath,
}) => {
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
            <Head>
                <title>{_env.SHOP_NAME}</title>
            </Head>
            <Header types={types ?? []} pathname={pathname} asPath={asPath} />
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
            <div className="_max-width flex flex-wrap _checkout w-full mt-5 mb-16">
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
                <div className="pl-5 border-l border-solid border-neutral-400 _right">
                    <ProductCheckout carts={carts} ship={ship} />
                </div>
            </div>
            <Footer />
        </>
    );
};

CheckoutComponent.getInitialProps = async ({
    pathname,
    asPath,
}: NextPageContext) => {
    try {
        const res = await API.type.gets();
        return { types: res.data, pathname, asPath };
    } catch {
        return { pathname, asPath };
    }
};

export default CheckoutComponent;
