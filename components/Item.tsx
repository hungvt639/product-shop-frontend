/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Product } from "../api/repository/productAPI";
import route from "../config/route";

type ItemProps = {
    item: Product;
};

const ItemComponent = (props: ItemProps) => {
    const { item } = props;
    return (
        <div className="_item">
            <Link href={`${route.PRODUCT}/${item.slug}`}>
                <a>
                    <div className="item">
                        <div className="image">
                            <img className="img" src={item.img} alt="avatar" />
                            <img
                                className="img1"
                                src={item.img1}
                                alt="avatar"
                            />
                        </div>
                        <h3 className="text-lg font-semibold mt-5">
                            {item.name}
                        </h3>
                        <p>{item.price.toLocaleString("vi-VN")}₫</p>
                    </div>
                </a>
            </Link>
        </div>
    );
};

export default ItemComponent;
