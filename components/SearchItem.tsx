/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ProductSearch } from "../api/repository/productAPI";
import route from "../config/route";

type SearchItemComponentProps = {
    item: ProductSearch;
};

const SearchItemComponent = (props: SearchItemComponentProps) => {
    const { item } = props;

    return (
        <Link href={`${route.PRODUCT}/${item._source.slug}`}>
            <a className="flex hover:bg-zinc-100 py-3 px-5 border-t border-dotted justify-between">
                <div className="w-full">
                    <h2 className="text-base font-bold pr-5">
                        {item._source.name}
                    </h2>
                    <p>{item._source.type.name}</p>
                    <p>{item._source.price.toLocaleString("vi-VN")}₫</p>
                </div>
                <div>
                    <div className="w-16 h-16">
                        <img src={item._source.img} alt="img" />
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default SearchItemComponent;
