/* eslint-disable @next/next/no-img-element */
import { Cart } from "../store";
import utils from "../utils";
import { AiOutlineLine } from "react-icons/ai";
type ProductCheckoutProps = {
    carts: Cart[];
    ship?: number;
};
const ProductCheckoutComponent = (props: ProductCheckoutProps) => {
    const { carts, ship } = props;
    return (
        <div>
            <div className="border-b border-solid border-stone-400 ml-5">
                {!carts.length && (
                    <p className="text-base font-bold">
                        Không có sản phẩm trong giỏ hàng
                    </p>
                )}
                {carts.map((cart, i) => (
                    <div
                        key={i}
                        className="flex mb-5 border-b border-dotted border-stone-200"
                    >
                        <div>
                            <div className="image w-20 h-20 rounded overflow-hidden">
                                <img
                                    className="w-full h-full"
                                    src={cart.product.img}
                                    alt="img"
                                />
                            </div>
                        </div>

                        <div className="ml-5 w-full">
                            <h2 className="text-base font-bold pr-5">
                                {cart.product.name}
                            </h2>
                            <div className="flex text-zinc-500 my-1">
                                <span className="mr-2">{cart.size}</span>/
                                <span className="mx-2">{cart.color.name}</span>
                                <div className="w-4 h-4 overflow-hidden cursor-pointer">
                                    <p
                                        className="w-full h-full"
                                        style={{
                                            backgroundColor: cart.color.code,
                                        }}
                                    ></p>
                                </div>
                            </div>
                            <div className="flex justify-between items-end mt-1">
                                <span className="bg-gray-100 px-2 rounded text-zinc-500">
                                    {cart.amount}
                                </span>
                                <span className="text-base font-semibold">
                                    {cart.product.price.toLocaleString("vi-VN")}
                                    ₫
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="py-5 border-b border-solid border-stone-400 text-base ml-5">
                <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span>
                        {utils.sumMoney(carts).toLocaleString("vi-VN")}₫
                    </span>
                </div>
                <div className="flex justify-between mt-2">
                    <span>Phí vận chuyển</span>
                    <span>
                        {ship ? (
                            ship.toLocaleString("vi-VN")
                        ) : (
                            <AiOutlineLine />
                        )}
                    </span>
                </div>
            </div>
            <div className="flex justify-between py-5 text-xl font-bold ml-5">
                <span>Tổng cộng</span>
                <span>
                    {(utils.sumMoney(carts) + (ship ?? 0)).toLocaleString(
                        "vi-VN"
                    )}
                    ₫
                </span>
            </div>
        </div>
    );
};
export default ProductCheckoutComponent;
