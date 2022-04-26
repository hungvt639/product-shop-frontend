import Link from "next/link";
import { Type } from "../../../api/repository/typeAPI";
import route from "../../../config/route";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { FcCallback, FcInvite } from "react-icons/fc";
import _env from "../../../config/_env";
import { Dispatch, SetStateAction, useState } from "react";
type MenuMinProps = {
    show: boolean;
    types: Type[];
    resolvedUrl: string;
    setShowMenu: Dispatch<SetStateAction<boolean>>;
};
const MenuMin = (props: MenuMinProps) => {
    const { resolvedUrl, show, types, setShowMenu } = props;

    const [showType, setShowtype] = useState(false);
    return (
        <div
            className={`_menu-min bg-white z-[150] w-full${
                show ? " _block" : " _hidden"
            }`}
        >
            <menu
                className={`_show-menu-min${showType ? " _not-show-menu" : ""}`}
            >
                <div
                    className={`text-base py-3 border-b hover:bg-slate-50 font-semibold${
                        resolvedUrl === route.HOME
                            ? " border-b-4  border-stone-700"
                            : ""
                    }`}
                >
                    <Link href={route.HOME}>TRANG CHỦ</Link>
                </div>
                <div
                    className={`text-base py-3 border-b hover:bg-slate-50 font-semibold${
                        resolvedUrl === route.PRODUCT
                            ? " border-b-4 border-stone-700"
                            : ""
                    }`}
                >
                    <Link href={route.PRODUCT}>SẢN PHẨM</Link>
                </div>
                <div
                    className={`flex justify-between items-center text-base py-3 border-b hover:bg-slate-50 font-semibold${
                        resolvedUrl.startsWith(route.SHOP)
                            ? " border-b-4 border-stone-700"
                            : ""
                    }`}
                >
                    <Link href={route.SHOP}>SHOP</Link>
                    <div>
                        <BsChevronRight onClick={() => setShowtype(true)} />
                    </div>
                </div>
                <h1 className="text-lg mt-5">BẠN CẦN HỖ TRỢ?</h1>
                <div>
                    <Link href={`tel:${_env.PHONE_NUMBER}`}>
                        <a className="flex items-center mt-5">
                            <FcCallback className="text-2xl mr-3" />
                            <span className="text-base font-semibold">
                                Liên hệ: {_env.PHONE_NUMBER}
                            </span>
                        </a>
                    </Link>
                </div>
                <div className="flex items-center mt-5">
                    <FcInvite className="text-2xl mr-3" />
                    <span className="text-base font-semibold">
                        {_env.EMAIL}
                    </span>
                </div>
            </menu>
            <menu
                className={`_show-menu-min${showType ? "" : " _not-show-type"}`}
            >
                <div
                    onClick={() => setShowtype(false)}
                    className="flex items-center text-base py-3 border-b cursor-pointer"
                >
                    <BsChevronLeft />
                    <span>Quay lại</span>
                </div>
                <div>
                    {types?.map((t) => (
                        <Link key={t._id} href={`${route.SHOP}/${t.slug}`}>
                            <a>
                                <div
                                    onClick={() => setShowMenu(false)}
                                    className={`text-base font-semibold py-2 px-2 border-b${
                                        resolvedUrl?.startsWith(
                                            route.SHOP + "/" + t.slug
                                        )
                                            ? " bg-stone-100"
                                            : ""
                                    }`}
                                >
                                    {t.name}
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
            </menu>
        </div>
    );
};
export default MenuMin;
