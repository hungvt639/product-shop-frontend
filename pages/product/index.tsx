import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";
import API from "../../api";
import { Type, TypeProduct } from "../../api/repository/typeAPI";
import BreadcrumbComponent from "../../components/Breadcrumb";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import Sider from "../../components/common/sider";
import ListItemsComponent from "../../components/ListItems";
import route from "../../config/route";
import _env from "../../config/_env";

type ProductComponentProps = {
    products: TypeProduct[];
    types?: Type[];
    pathname: string;
    asPath?: string;
};

const ProductComponent: NextPage<ProductComponentProps> = ({
    products,
    types,
    pathname,
    asPath,
}) => {
    const breadcrumb = useMemo(() => {
        return [
            {
                name: "SẢN PHẨM",
                link: route.PRODUCT,
            },
        ];
    }, []);

    return (
        <>
            <Head>
                <title>{_env.SHOP_NAME}</title>
            </Head>
            <Header types={types ?? []} pathname={pathname} asPath={asPath} />
            <BreadcrumbComponent data={breadcrumb} />
            <div className="_max-width flex flex-wrap _shops">
                <div className="_left">
                    <Sider types={types ?? []} asPath={asPath} />
                </div>
                <div className="_right">
                    <div>
                        {products.map((ps) => (
                            <div key={ps._id}>
                                <Link href={`${route.SHOP}/${ps.slug}`}>
                                    <a>
                                        <h3 className="px-5 text-2xl font-bold mt-10">
                                            / {ps.name} /
                                        </h3>
                                    </a>
                                </Link>

                                <ListItemsComponent items={ps.product.docs} />
                                <div className="flex justify-center">
                                    <Link href={`${route.SHOP}/${ps.slug}`}>
                                        <a>
                                            <button className="mb-10 px-5 rounded-sm text-white bg-zinc-900">
                                                XEM THÊM ...
                                            </button>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default ProductComponent;
ProductComponent.getInitialProps = async ({
    pathname,
    asPath,
}: NextPageContext) => {
    try {
        const data = await Promise.all([
            await API.type.getsProduct({
                select: "_id name slug sold price img img1 isSale",
                limit: 4,
            }),
            await API.type.gets(),
        ]);

        return {
            products: data[0].data,
            types: data[1].data,
            pathname,
            asPath,
        };
    } catch {
        return { products: [], pathname, asPath };
    }
};
