import { Type } from "../../../api/repository/typeAPI";
import { GrMenu, GrClose } from "react-icons/gr";
import { useState } from "react";
import Link from "next/link";
import route from "../../../config/route";
import Image from "next/image";
import Logo from "../../../public/img/logo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import Search from "./Search";
import MenuMin from "./MenuMin";

type HeaderMinProps = { types: Type[]; pathname: string; asPath?: string };
const HeaderMin = (props: HeaderMinProps) => {
    const { pathname, types, asPath } = props;

    const carts = useSelector((s: AppState) => s.cart.carts);

    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="_header-min flex-col">
            {/* <div className="relative"> */}
            <MenuMin
                pathname={pathname}
                show={showMenu}
                types={types}
                asPath={asPath}
            />
            <div className="flex justify-between px-5 border-b pb-2">
                <div className="text-2xl font-bold">
                    {showMenu ? (
                        <GrClose onClick={() => setShowMenu(false)} />
                    ) : (
                        <GrMenu onClick={() => setShowMenu(true)} />
                    )}
                </div>
                <Link href={route.HOME}>
                    <a className="w-48">
                        <Image
                            className="w-full h-full"
                            src={Logo}
                            alt="Logo"
                        />
                    </a>
                </Link>
                <Link href={route.CART}>
                    <a>
                        <div className="_cart-btn flex items-center text-14 font-semibold cursor-pointer">
                            <div className="_cart-icon mr-2">
                                <AiOutlineShoppingCart />
                                <div className="_cart-number">
                                    {carts.length}
                                </div>
                            </div>
                        </div>
                    </a>
                </Link>
            </div>
            {/* </div> */}
            <div className="py-1 px-2">
                <Search />
            </div>
        </div>
    );
};
export default HeaderMin;
