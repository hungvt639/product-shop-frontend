import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";
import API from "../../api";
import { BlogLink } from "../../api/repository/blogLinkAPI";
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
    pathname: string;
    asPath?: string;
    blogLinks?: BlogLink[];
};

const ProductDetailComponent: NextPage<ProductProps> = (props) => {
    const { product, types, pathname, asPath, blogLinks } = props;

    const { setSize, size, color, setColor, amount, changeAmount, addToCart } =
        useProduct(product);

    const breadcrumb = useMemo(() => {
        return [
            {
                name: "SẢN PHẨM",
                link: route.PRODUCT,
            },
            {
                name: "SHOP",
                link: route.SHOP,
            },
            {
                name: product?.type.name ?? "",
                link: route.SHOP + "/" + product?.type.slug ?? "",
            },
            {
                name: product?.name ?? "",
                link: `${route.PRODUCT}/${product?.slug}`,
            },
        ];
    }, [product?.name, product?.slug, product?.type.name, product?.type.slug]);

    return (
        <>
            <Head>
                <title>{product?.name}</title>
            </Head>
            <Header types={types ?? []} pathname={pathname} asPath={asPath} />
            <Breadcrumb data={breadcrumb} />
            {product && (
                <div className="_product _max-width">
                    <div className="flex flex-wrap sticky">
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
                                            s === size
                                                ? " _size-select"
                                                : " hover:bg-slate-400 hover:text-white hover:border-slate-400"
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
                                            className={`_color overflow-hidden hover:bg-sky-800 cursor-pointer${
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
                                        className="hover:bg-slate-400 hover:text-white hover:border-slate-400"
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
                                        className="hover:bg-slate-400 hover:text-white hover:border-slate-400"
                                        onClick={() => changeAmount(amount + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="_add-cart mt-7 text-white py-3 px-24 hover:bg-slate-400"
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
                                <a>/ SẢN PHẨM LIÊN QUAN /</a>
                            </Link>
                        </h1>
                        {product.sames && <ListItems items={product.sames} />}
                    </div>
                </div>
            )}

            <Footer blogLinks={blogLinks ?? []} />
        </>
    );
};
ProductDetailComponent.getInitialProps = async ({
    query,
    pathname,
    asPath,
}: NextPageContext) => {
    try {
        const data = await Promise.all([
            await API.product.getProduct(query.slug as string),
            await API.type.gets(),
            await API.blog_link.gets({ select: "_id name slug" }),
        ]);
        return {
            product: data[0].data,
            types: data[1].data,
            blogLinks: data[2].data,
            pathname,
            asPath,
        };
    } catch {
        return { pathname, asPath };
    }
};
export default ProductDetailComponent;
