/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import route from "../../../config/route";
import Logo from "../../../public/img/logo.png";
import Phone from "../../../public/img/phone.webp";
import Policy from "../../../public/img/policy_icon_2.webp";
import policy_icon_3 from "../../../public/img/policy_icon_3.webp";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Dropdown from "../../../container/Dropdown";
import { Type } from "../../../api/repository/typeAPI";
import React, { useMemo } from "react";
import Search from "./Search";
import _env from "../../../config/_env";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import CartBase from "./CartBase";
import HeaderMin from "./HeaderMin";

const infos = [
    {
        icon: Phone,
        name: "Hotline mua hàng",
        content: `Gọi ngay: ${_env.PHONE_NUMBER}`,
    },
    {
        icon: Policy,
        name: "Giao hàng tận nơi",
        content: "Miễn phí từ 5 sản phẩm",
    },
    {
        icon: policy_icon_3,
        name: "1 Đổi 1 nếu lỗi hàng",
        content: "Trong vòng 7 ngày",
    },
];

type HeaderProps = {
    types: Type[];
    pathname: string;
    asPath?: string;
};
const Header = (props: HeaderProps) => {
    const carts = useSelector((s: AppState) => s.cart.carts);
    const { types, pathname, asPath } = props;
    const menu = useMemo(() => {
        return (
            <menu className="flex flex-col border-t-2 border-solid border-gray-500 bg-white">
                {types.map((type) => (
                    <div
                        className={`px-5 py-2 text-base border-t border-solid border-gray-300${
                            asPath?.startsWith(route.SHOP + "/" + type.slug)
                                ? " bg-stone-100"
                                : ""
                        }`}
                        key={type._id}
                    >
                        <Link href={`${route.SHOP}/${type.slug}`}>
                            {type.name}
                        </Link>
                    </div>
                ))}
            </menu>
        );
    }, [asPath, types]);

    return (
        <header className="w-full _header py-5">
            <HeaderMin pathname={pathname} types={types} asPath={asPath} />
            <div className="_max-width w-full flex flex-col">
                <div className="flex w-full pr-5">
                    <div className="_image-logo">
                        <Link href={route.HOME}>
                            <a>
                                <Image
                                    className="w-full h-full"
                                    src={Logo}
                                    alt="Logo"
                                />
                            </a>
                        </Link>
                    </div>
                    <div className="flex flex-row flex-3">
                        {infos.map((info) => (
                            <div className="flex-1" key={info.name}>
                                <div className="flex flex-row justify-center items-center">
                                    <div className="w-25px h-25px flex items-end mr-5">
                                        <Image
                                            width={25}
                                            height={25}
                                            src={info.icon}
                                            alt="icon"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-12px font-bold">
                                            {info.name}
                                        </p>
                                        <p className="text-12px font-semibold">
                                            {info.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end flex-1">
                        <Dropdown
                            placement="top100_right"
                            overlay={<CartBase carts={carts} />}
                        >
                            <Link href={route.CART}>
                                <a>
                                    <div className="_cart-btn flex items-center text-14 font-semibold cursor-pointer">
                                        <div className="_cart-icon mr-2">
                                            <AiOutlineShoppingCart />
                                            <div className="_cart-number">
                                                {carts.length}
                                            </div>
                                        </div>
                                        <span>Giỏ hàng</span>
                                    </div>
                                </a>
                            </Link>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex w-full mt-5">
                    <menu className="flex items-center">
                        <div
                            className={`text-base font-semibold mr-5${
                                pathname === route.HOME
                                    ? " border-b-4  border-stone-700"
                                    : ""
                            }`}
                        >
                            <Link href={route.HOME}>TRANG CHỦ</Link>
                        </div>
                        <div
                            className={`text-base font-semibold mr-5${
                                pathname === route.PRODUCT
                                    ? " border-b-4 border-stone-700"
                                    : ""
                            }`}
                        >
                            <Link href={route.PRODUCT}>SẢN PHẨM</Link>
                        </div>
                        <div
                            className={`text-base font-semibold${
                                pathname.startsWith(route.SHOP)
                                    ? " border-b-4 border-stone-700"
                                    : ""
                            }`}
                        >
                            <Dropdown overlay={menu}>
                                <Link href={route.SHOP}>SHOP</Link>
                            </Dropdown>
                        </div>
                    </menu>
                    <div className="flex flex-1 justify-end px-5">
                        <Search />
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;
