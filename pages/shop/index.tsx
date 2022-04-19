import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import API from "../../api";
import { Pagination, SearchBody } from "../../api/interface";
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
type ShopProps = {
    products?: Pagination<Product>;
    types?: Type[];
    query?: SearchBody;
};
const ShopComponent: NextPage<ShopProps> = ({ products, types, query }) => {
    const router = useRouter();
    const onPageChange = (page: number) => {
        router.push(utils.toUrl(route.SHOP, { ...query, page }));
    };
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
    return (
        <>
            <Header types={types ?? []} />
            <BreadcrumbComponent data={breadcrumb} />
            <div className="_max-width flex _shops">
                <div className="_left">
                    <Sider types={types ?? []} />
                </div>
                <div className="_right">
                    <div className="flex px-5">
                        <h1>BEST SELLER</h1>
                        <div>Input</div>
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
            <Footer />
        </>
    );
};

ShopComponent.getInitialProps = async ({ query }: NextPageContext) => {
    try {
        const data = await Promise.all([
            await API.product.gets({
                select: "_id name slug sold price img img1 isSale",
                sort: query.sort as string,
                limit: query.limit as string,
                page: query.page as string,
            }),
            await API.type.gets(),
        ]);
        return { products: data[0].data, types: data[1].data, query };
    } catch {
        return {};
    }
};

export default ShopComponent;
