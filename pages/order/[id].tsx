/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Image, Steps, Tag } from "antd";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { IoReturnUpBackOutline } from "react-icons/io5";
import API from "../../api";
import { Order } from "../../api/repository/orderAPI";
import { Type } from "../../api/repository/typeAPI";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import route from "../../config/route";
import _env from "../../config/_env";
import utils from "../../utils";

const { Step } = Steps;

type OrderProps = {
    order?: Order;
    types?: Type[];
};

const OrderDetailComponent: NextPage<OrderProps> = (props) => {
    const { order, types } = props;

    return (
        <>
            <Head>
                <title>{_env.SHOP_NAME}</title>
            </Head>
            <Header types={types ?? []} />
            {order && (
                <div className="_max-width _order">
                    <h1 className="text-center font-extrabold text-2xl">
                        Đơn hàng của bạn
                    </h1>
                    <h2 className="text-center text-sm font-semibold mt-2">
                        Thường xuyên kiểm tra email của bạn, chúng tôi sẽ gửi
                        thông tin đơn hàng khi có cập nhật
                    </h2>
                    <p className="text-center mt-2">
                        Mã đơn <span className="font-bold">{order._id}</span>
                    </p>
                    <div className="flex justify-center">
                        <div className="w-20 h-1 bg-black mb-5 mt-10"></div>
                    </div>
                    <div className="flex">
                        <div className="_left mb-10 mr-5">
                            <div className="w-full mb-10 pb-3 border-b border-dashed border-stone-300">
                                <Steps size="small">
                                    {utils.status.map(
                                        (s, i) =>
                                            s.label !== "Đã hủy" && (
                                                <Step
                                                    description={
                                                        i === 0
                                                            ? utils.formatDate(
                                                                  order.created_at
                                                              )
                                                            : i === order.status
                                                            ? utils.formatDate(
                                                                  order.updated_at
                                                              )
                                                            : ""
                                                    }
                                                    key={i}
                                                    title={s.label}
                                                    status={utils.getStatus(
                                                        order,
                                                        i
                                                    )}
                                                />
                                            )
                                    )}
                                </Steps>
                            </div>
                            {order.orderProduct.map((cart, i) => (
                                <div
                                    className="mt-5 pb-5 border-b border-dotted relative"
                                    key={i}
                                >
                                    <div className="flex">
                                        <div>
                                            <div className="w-20 h-20">
                                                <Image
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
                                                    <span>{cart.amount}</span>
                                                </div>
                                                <div>
                                                    {cart.product.price.toLocaleString(
                                                        "vi-VN"
                                                    )}
                                                    ₫/1 sản phẩm
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
                                </div>
                            ))}
                        </div>
                        <div className="_right mx-5 mb-10">
                            <div className="w-full border border-solid border-neutral-300 py-6 px-4 rounded-sm">
                                <h1 className="text-xl font-bold pb-3 border-b border-dotted border-neutral-300">
                                    Thông tin đơn hàng
                                </h1>
                                <div className="flex justify-between items-center py-3 border-b border-dotted border-neutral-300">
                                    <span className="text-lg">Tổng tiền</span>
                                    <span className="text-lg text-red-600 font-bold">
                                        {order.price.toLocaleString("vi-VN")}₫
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-dotted border-neutral-300">
                                    <span className="text-lg">Trạng thái</span>
                                    <Tag
                                        className="text-sm font-bold"
                                        color={
                                            utils.getTagStatus(order.status)
                                                .color
                                        }
                                    >
                                        {utils.getTagStatus(order.status).label}
                                    </Tag>
                                </div>
                                <div className="py-3 border-b border-dotted border-neutral-300">
                                    <h2 className="font-bold text-base mb-2">
                                        Thông tin giao hàng
                                    </h2>
                                    <div className="flex flex-col mt-1 text-sm font-medium">
                                        <div className="flex">
                                            <span>Họ-Tên:</span>
                                            <p className="font-bold ml-3">
                                                {order.fullname}
                                            </p>
                                        </div>
                                        <div className="flex mt-1">
                                            <span>Số điện thoại:</span>
                                            <p className="font-bold ml-3">
                                                {order.phone}
                                            </p>
                                        </div>
                                        <div className="flex mt-1">
                                            <span>Email:</span>
                                            <p className="font-bold ml-3">
                                                {order.email}
                                            </p>
                                        </div>
                                        <div className="flex mt-1">
                                            <span>Địa chỉ:</span>
                                            <p className="font-bold ml-3">
                                                {order.address}
                                            </p>
                                        </div>
                                        <div className="flex mt-1">
                                            <span>Ghi chú:</span>
                                            <p className="font-bold ml-3">
                                                {order.note}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
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
            )}

            <Footer />
        </>
    );
};
OrderDetailComponent.getInitialProps = async ({ query }: NextPageContext) => {
    try {
        const data = await Promise.all([
            await API.order.get(query.id as string),
            await API.type.gets(),
        ]);
        return { order: data[0].data, types: data[1].data };
    } catch {
        return {};
    }
};
export default OrderDetailComponent;
