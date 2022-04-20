/* eslint-disable @next/next/no-img-element */
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import API from "../api";
import { Type } from "../api/repository/typeAPI";
import BreadcrumbComponent from "../components/Breadcrumb";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import route from "../config/route";
import _env from "../config/_env";
import useCart from "../hooks/useCart";
import { AppState } from "../store";
import utils from "../utils";

type CartProps = {
    types?: Type[];
    pathname: string;
    asPath?: string;
};
const CartComponentComponent: NextPage<CartProps> = ({
    types,
    pathname,
    asPath,
}) => {
    const carts = useSelector((s: AppState) => s.cart.carts);
    const { reomteInCart, changeAmount } = useCart();
    const breadcrumb = useMemo(() => {
        return [
            {
                name: "GIỎ HÀNG",
                link: route.CART,
            },
        ];
    }, []);
    return (
        <>
            <Head>
                <title>{_env.SHOP_NAME}</title>
            </Head>
            <Header types={types ?? []} pathname={pathname} asPath={asPath} />
            <BreadcrumbComponent data={breadcrumb} />
            <div className="_max-width _cart">
                <h1 className="text-center font-extrabold text-2xl">
                    Giỏ hàng của bạn
                </h1>
                <p className="text-center mt-2">
                    Có {utils.sumAmount(carts)} trong giỏ hàng
                </p>
                <div className="flex justify-center">
                    <div className="w-20 h-1 bg-black mb-5 mt-10"></div>
                </div>
                <div className="flex flex-wrap">
                    <div className="_left mb-10 pr-5">
                        {!carts.length && (
                            <p className="text-base font-bold flex justify-center items-center flex-1 h-full">
                                Vui lòng quay lại SHOP để lựa chọn sản phẩm
                            </p>
                        )}
                        {carts.map((cart, i) => (
                            <div
                                className="mt-5 pb-5 border-b border-dotted relative"
                                key={i}
                            >
                                <div className="flex">
                                    <div>
                                        <div className="w-20 h-20">
                                            <img
                                                src={cart.product.img}
                                                alt="img"
                                            />
                                        </div>
                                    </div>

                                    <div className="ml-5 w-full">
                                        <Link
                                            href={`${route.PRODUCT}/${cart.product.slug}`}
                                        >
                                            <a>
                                                <h2 className="text-base font-bold pr-5">
                                                    {cart.product.name}
                                                </h2>
                                            </a>
                                        </Link>

                                        <div className="flex text-zinc-500 my-1">
                                            <span className="mr-2">
                                                {cart.size}
                                            </span>
                                            /
                                            <span className="mx-2">
                                                {cart.color.name}
                                            </span>
                                            <div className="w-4 h-4 overflow-hidden cursor-pointer">
                                                <p
                                                    className="w-full h-full"
                                                    style={{
                                                        backgroundColor:
                                                            cart.color.code,
                                                    }}
                                                ></p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-end mt-1">
                                            <div className="flex _amount">
                                                <button
                                                    onClick={() =>
                                                        changeAmount(
                                                            i,
                                                            cart.amount - 1
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={cart.amount}
                                                    onChange={(e) =>
                                                        changeAmount(
                                                            i,
                                                            parseInt(
                                                                e.target.value
                                                            ) ?? 1
                                                        )
                                                    }
                                                />
                                                <button
                                                    onClick={() =>
                                                        changeAmount(
                                                            i,
                                                            cart.amount + 1
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <span className="text-base font-semibold">
                                                {(
                                                    cart.product.price *
                                                    cart.amount
                                                ).toLocaleString("vi-VN")}
                                                ₫
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    onClick={() => reomteInCart(i)}
                                    className="absolute top-0 right-0 cursor-pointer"
                                >
                                    X
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="px-5 mb-10 _right">
                        <div className="w-full border border-solid border-neutral-300 py-6 px-4 rounded-sm">
                            <h1 className="text-xl font-bold pb-3 border-b border-dotted border-neutral-300">
                                Thông tin đơn hàng
                            </h1>
                            <div className="flex justify-between items-center py-3 border-b border-dotted border-neutral-300">
                                <span className="text-lg">Tổng tiền</span>
                                <span className="text-lg text-red-600 font-bold">
                                    {utils
                                        .sumMoney(carts)
                                        .toLocaleString("vi-VN")}
                                    ₫
                                </span>
                            </div>
                            <div>
                                <p className="pt-4 pb-5">
                                    Phí vận chuyển sẽ được tính ở trang thanh
                                    toán.
                                </p>
                                {carts.length ? (
                                    <Link href={route.CHECKOUT}>
                                        <a>
                                            <button className="w-full bg-red-600 text-white rounded border-red-600 py-2">
                                                THANH TOÁN
                                            </button>
                                        </a>
                                    </Link>
                                ) : (
                                    <button className="w-full bg-stone-600 text-white rounded stone-red-600 py-2">
                                        KHÔNG THỂ THANH TOÁN
                                    </button>
                                )}

                                <Link href={route.PRODUCT}>
                                    <a>
                                        <div className="flex justify-center items-end text-neutral-400 mt-3">
                                            <IoReturnUpBackOutline className="text-2xl" />
                                            <span className="text-base ml-2">
                                                Tiếp tục mua hàng
                                            </span>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

CartComponentComponent.getInitialProps = async ({
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

export default CartComponentComponent;
