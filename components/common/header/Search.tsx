/* eslint-disable @next/next/no-img-element */
import { AiOutlineSearch } from "react-icons/ai";
import useSearch from "../../../hooks/useSearch";
import { Fragment } from "react";
import Link from "next/link";
import route from "../../../config/route";
import useSearchHeader from "./hook/useSearchhHeader";

const Search = () => {
    const { setValue, value, searchRes } = useSearch();
    const { defaultF, onShow, onSubmit, show } = useSearchHeader();

    return (
        <div className="relative max-w-xs w-full _search">
            <form
                className="flex flex-row overflow-hidden rounded-md"
                onSubmit={onSubmit}
            >
                <input
                    onClick={defaultF}
                    onFocus={onShow}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="rounded-l-md"
                    placeholder="Tìm kiếm sản phẩm..."
                />
                <button className="text-white px-4">
                    <AiOutlineSearch />
                </button>
            </form>
            <div
                onClick={defaultF}
                className={`absolute top-12 left-0 max-w-xs w-96 z-[100] shadow-md bg-white rounded-sm border _search-content ${
                    show ? "block" : "hidden"
                }`}
            >
                {!searchRes ? (
                    <Fragment />
                ) : !searchRes.total ? (
                    <div className="text-center font-bold py-3">
                        Không tìm thấy sản phẩm nào
                    </div>
                ) : (
                    <div className="">
                        {searchRes.hits.map((ps) => (
                            <Link
                                key={ps._id}
                                href={`${route.PRODUCT}/${ps._source.slug}`}
                            >
                                <a className="flex hover:bg-zinc-100 py-3 px-5 border-t border-dotted justify-between">
                                    <div className="w-full">
                                        <h2 className="text-base font-bold pr-5">
                                            {ps._source.name}
                                        </h2>
                                        <p>{ps._source.type.name}</p>
                                        <p>
                                            {ps._source.price.toLocaleString(
                                                "vi-VN"
                                            )}
                                            ₫
                                        </p>
                                    </div>
                                    <div>
                                        <div className="w-16 h-16">
                                            <img
                                                src={ps._source.img}
                                                alt="img"
                                            />
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Search;
