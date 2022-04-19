/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import route from "../../../config/route";
import useCart from "../../../hooks/useCart";
import { Cart } from "../../../store";
import utils from "../../../utils";

type CartBaseProps = {
    carts: Cart[];
};
const CartBase = (props: CartBaseProps) => {
    const { reomteInCart } = useCart();
    const { carts } = props;
    return (
        <div className="px-4 py-4 bg-white w-96">
            <h1 className="text-center text-lg font-bold bg-gray-200 mt-3 p-1 border border-solid border-gray-300 rounded">
                Giỏ hàng
            </h1>
            <div>
                {carts.map((cart, i) => (
                    <div
                        className="mt-5 pb-7 border-b border-dotted relative"
                        key={i}
                    >
                        <Link href={`${route.PRODUCT}/${cart.product.slug}`}>
                            <a className="flex">
                                <div className="w-20 h-20">
                                    <img src={cart.product.img} alt="img" />
                                </div>
                                <div className="ml-5 w-full">
                                    <h2 className="text-base font-bold pr-5">
                                        {cart.product.name}
                                    </h2>
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
                                        <span className="bg-gray-100 px-2 rounded text-zinc-500">
                                            {cart.amount}
                                        </span>
                                        <span className="text-base font-semibold">
                                            {cart.product.price.toLocaleString(
                                                "vi-VN"
                                            )}
                                            ₫
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </Link>
                        <div
                            onClick={() => reomteInCart(i)}
                            className="absolute top-0 right-0 cursor-pointer"
                        >
                            X
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center my-5">
                <span>TỔNG TIỀN</span>
                <span className="text-base font-bold text-red-500">
                    {utils.sumMoney(carts).toLocaleString("vi-VN")}₫
                </span>
            </div>
            <div className="flex mb-5">
                <div className="w-1/2 pr-3">
                    <Link href={route.CART}>
                        <a>
                            <button className="w-full py-2 rounded-sm text-white hover:bg-stone-400">
                                XEM GIỎ HÀNG
                            </button>
                        </a>
                    </Link>
                </div>
                <div className="w-1/2 pl-3">
                    <Link href={route.CHECKOUT}>
                        <a>
                            <button className="w-full  py-2 rounded-sm text-white hover:bg-stone-400">
                                THANH TOÁN
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default CartBase;
