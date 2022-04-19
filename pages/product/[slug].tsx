import { NextPage, NextPageContext } from "next";
import Link from "next/link";
import API from "../../api";
import { Product } from "../../api/repository/productAPI";
import { Type } from "../../api/repository/typeAPI";
import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import ListItems from "../../components/ListItems";
import route from "../../config/route";
import useProduct from "../../hooks/useProduct";
type ProductProps = {
    product?: Product;
    types?: Type[];
};
const ProductDetailComponent: NextPage<ProductProps> = (props) => {
    const { product, types } = props;

    const { setSize, size, color, setColor, amount, changeAmount, addToCart } =
        useProduct(product);

    const breadcrumb = [
        {
            name: "SHOP",
            link: route.SHOP,
        },
        {
            name: product?.name ?? "",
            link: `${route.PRODUCT}/${product?.slug}`,
        },
    ];

    return (
        <>
            <Header types={types ?? []} />
            <Breadcrumb data={breadcrumb} />
            {product && (
                <div className="_product  _max-width">
                    <div className="flex flex-wra stickyp">
                        <div className="_left top-0">
                            <Avatar
                                imgs={[
                                    product.img,
                                    product.img1,
                                    ...product.image,
                                ]}
                            />
                        </div>
                        <div className="_right top-0">
                            <h2 className="text-lg font-extrabold">
                                {product.name}
                            </h2>
                            <p className="border-b border-dotted border-gray-300 pb-3">
                                {product.type.name}
                            </p>
                            <p className="text-lg font-extrabold py-2 text-red-500 border-b border-dotted border-gray-300">
                                {product.price.toLocaleString("vi-VN")}₫
                            </p>
                            <div className="flex py-2 border-b border-dotted border-gray-300">
                                {product.sizes.map((s, i) => (
                                    <div
                                        onClick={() => setSize(s)}
                                        className={`_size flex justify-center items-center mr-2 cursor-pointer${
                                            s === size ? " _size-select" : ""
                                        }`}
                                        key={i}
                                    >
                                        {s}
                                    </div>
                                ))}
                            </div>
                            <div className="flex py-2 border-b border-dotted border-gray-300">
                                {product.colors.map((c) => (
                                    <div className="mr-5" key={c._id}>
                                        <p className="text-center">{c.name}</p>
                                        <div
                                            onClick={() => setColor(c)}
                                            className={`_color overflow-hidden cursor-pointer${
                                                color?._id === c._id
                                                    ? " _color-select"
                                                    : ""
                                            }`}
                                        >
                                            <p
                                                className="w-full h-full"
                                                style={{
                                                    backgroundColor: c.code,
                                                }}
                                            ></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="py-2">
                                <div className="flex _amount">
                                    <button
                                        onClick={() => changeAmount(amount - 1)}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) =>
                                            changeAmount(
                                                parseInt(e.target.value) ?? 1
                                            )
                                        }
                                    />
                                    <button
                                        onClick={() => changeAmount(amount + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="_add-cart mt-7 text-white py-3 px-24"
                                >
                                    THÊM VÀO GIỎ
                                </button>
                            </div>
                            <div>
                                <h3>Mô tả</h3>
                                <div
                                    className="dangerouslySetInnerHTML"
                                    dangerouslySetInnerHTML={{
                                        __html: product?.description ?? "",
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="font-bold text-2xl text-center mt-5">
                            <Link href={`${route.SHOP}/${product.type.slug}`}>
                                <a>SẢN PHẨM LIÊN QUAN</a>
                            </Link>
                        </h1>
                        {product.sames && <ListItems items={product.sames} />}
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};
ProductDetailComponent.getInitialProps = async ({ query }: NextPageContext) => {
    try {
        const data = await Promise.all([
            await API.product.getProduct(query.slug as string),
            await API.type.gets(),
        ]);
        return { product: data[0].data, types: data[1].data };
    } catch {
        return {};
    }
};
export default ProductDetailComponent;
