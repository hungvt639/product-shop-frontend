/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Type } from "../../../api/repository/typeAPI";
import route from "../../../config/route";
import { BsChevronDown } from "react-icons/bs";
import { useMemo, useState } from "react";
import ClickDropdown from "../../../container/ClickDorpdown";
type SiderProps = {
    types: Type[];
    resolvedUrl: string;
};

const Sider = (props: SiderProps) => {
    const { types, resolvedUrl } = props;
    const [showMenu, setShowMenu] = useState(false);

    const Menu = useMemo(() => {
        return (
            <>
                {types?.map((t) => (
                    <Link key={t._id} href={`${route.SHOP}/${t.slug}`}>
                        <a>
                            <div
                                className={`text-base font-semibold py-2 px-2 border-b mr-9 ${
                                    resolvedUrl.startsWith(
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
            </>
        );
    }, [resolvedUrl, types]);
    return (
        <div className="w-full _sider">
            <div className="_sider-large">{Menu}</div>
            <div className="_sider-small">
                <ClickDropdown overlay={Menu}>
                    <div
                        onClick={() => setShowMenu(!showMenu)}
                        className="flex justify-between items-center bg-neutral-200 font-bold py-1 px-3"
                    >
                        <h1>DANH MỤC SẢN PHẨM</h1> <BsChevronDown />
                    </div>
                </ClickDropdown>
            </div>
        </div>
    );
};
export default Sider;
