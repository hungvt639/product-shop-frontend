/* eslint-disable @next/next/no-img-element */
import { AiOutlineSearch } from "react-icons/ai";
import useSearch from "../../../hooks/useSearch";
import { Fragment } from "react";
import Link from "next/link";
import route from "../../../config/route";
import useSearchHeader from "./hook/useSearchhHeader";
import SearchItemComponent from "../../SearchItem";

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
                    <menu className="">
                        {searchRes.hits.map((ps) => (
                            <SearchItemComponent item={ps} key={ps._id} />
                        ))}
                    </menu>
                )}
            </div>
        </div>
    );
};
export default Search;
