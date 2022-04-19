/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Type } from "../../../api/repository/typeAPI";
import route from "../../../config/route";

type SiderProps = {
    types: Type[];
    asPath?: string;
};

const Sider = (props: SiderProps) => {
    const { types, asPath } = props;
    return (
        <div className="w-full">
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
    );
};
export default Sider;
