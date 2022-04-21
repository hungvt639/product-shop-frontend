/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Type } from "../../../api/repository/typeAPI";
import route from "../../../config/route";
import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";
type SiderProps = {
    types: Type[];
    asPath?: string;
};

const Sider = (props: SiderProps) => {
    const { types, asPath } = props;
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className="w-full _sider">
            <div className="_sider-large">
                {types?.map((t) => (
                    <div
                        className={`text-base font-semibold py-2 px-2 border-b mr-9 ${
                            asPath?.startsWith(route.SHOP + "/" + t.slug)
                                ? " bg-stone-100"
                                : ""
                        }`}
                        key={t._id}
                    >
                        <Link href={`${route.SHOP}/${t.slug}`}>
                            <a>{t.name}</a>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="_sider-small">
                <div
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex justify-between items-center bg-neutral-200 font-bold py-1 px-3"
                >
                    <h1>DANH MỤC SẢN PHẨM</h1> <BsChevronDown />
                </div>
                <div
                    className={`_small${
                        showMenu ? " _show-menu" : " _not-show-menu"
                    }`}
                >
                    {types?.map((t) => (
                        <div
                            className={`text-base font-semibold py-2 px-2 border-b mr-9 ${
                                asPath?.startsWith(route.SHOP + "/" + t.slug)
                                    ? " bg-stone-100"
                                    : ""
                            }`}
                            key={t._id}
                        >
                            <Link href={`${route.SHOP}/${t.slug}`}>
                                <a>{t.name}</a>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Sider;
