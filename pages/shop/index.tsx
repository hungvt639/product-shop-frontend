import { Select } from "antd";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import API from "../../api";
import { Pagination, SearchBody } from "../../api/interface";
import { BlogLink } from "../../api/repository/blogLinkAPI";
import { Product } from "../../api/repository/productAPI";
import { Type } from "../../api/repository/typeAPI";
import BreadcrumbComponent from "../../components/Breadcrumb";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import Sider from "../../components/common/sider";
import ListItems from "../../components/ListItems";
import PaginationCpn from "../../components/Pagination";
import route from "../../config/route";
import utils from "../../utils";

const { Option } = Select;

type ShopProps = {
    products?: Pagination<Product>;
    types?: Type[];
    query?: SearchBody;
    resolvedUrl: string;
    blogLinks?: BlogLink[];
};
const ShopComponent: NextPage<ShopProps> = ({
    products,
    types,
    query,
    resolvedUrl,
    blogLinks,
}) => {
    const router = useRouter();

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
        ];
    }, []);
    const onPageChange = (page: number) => {
        router.push(utils.toUrl(route.SHOP, { ...query, page }));
    };

    const handleChange = (value: string) => {
        router.push(utils.toUrl(route.SHOP, { ...query, sort: value }));
    };
    return (
        <>
            <Header types={types ?? []} resolvedUrl={resolvedUrl} />
            <BreadcrumbComponent data={breadcrumb} />
            <div className="_max-width flex flex-wrap _shops">
                <div className="_left">
                    <Sider types={types ?? []} resolvedUrl={resolvedUrl} />
                </div>
                <div className="_right">
                    <div className="flex px-5 justify-between">
                        <h1 className="text-xl font-bold">/ BEST SELLER /</h1>
                        <Select
                            className="_select-ant"
                            placeholder="Lọc"
                            defaultValue={query?.sort}
                            style={{ width: 120 }}
                            onChange={handleChange}
                        >
                            <Option value="name">Tên A-Z</Option>
                            <Option value="-name">Tên Z-A</Option>
                            <Option value="-sold">Bán chạy nhất</Option>
                            <Option value="price">Giá tăng dần</Option>
                            <Option value="-price">Giá giảm dần</Option>
                        </Select>
                    </div>
                    <div>{products && <ListItems items={products.docs} />}</div>
                    <div className="flex justify-center">
                        {products && (
                            <PaginationCpn
                                onPageChange={onPageChange}
                                data={products}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer blogLinks={blogLinks ?? []} />
        </>
    );
};

// ShopComponent.getInitialProps = async ({
//     query,
//     pathname,
//     asPath,
// }: NextPageContext) => {
//     try {
//         const data = await Promise.all([
//             await API.product.gets({
//                 select: "_id name slug sold price img img1 isSale",
//                 ...query,
//             }),
//             await API.type.gets(),
//             await API.blog_link.gets({ select: "_id name slug" }),
//         ]);
//         return {
//             products: data[0].data,
//             types: data[1].data,
//             blogLinks: data[2].data,
//             query,
//             pathname,
//             asPath,
//         };
//     } catch {
//         return { resolvedUrl };
//     }
// };

export default ShopComponent;

export const getServerSideProps: GetServerSideProps<ShopProps> = async ({
    query,
    resolvedUrl,
}: GetServerSidePropsContext) => {
    try {
        const data = await Promise.all([
            await API.product.gets({
                select: "_id name slug sold price img img1 isSale",
                ...query,
            }),
            await API.type.gets(),
            await API.blog_link.gets({ select: "_id name slug" }),
        ]);
        return {
            props: {
                products: data[0].data,
                types: data[1].data,
                blogLinks: data[2].data,
                query,
                resolvedUrl,
            },
        };
    } catch {
        return { props: { resolvedUrl, query } };
    }
};
