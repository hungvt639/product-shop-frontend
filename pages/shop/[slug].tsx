import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import API from "../../api";
import { SearchBody } from "../../api/interface";
import { Type, TypeProduct } from "../../api/repository/typeAPI";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import Sider from "../../components/common/sider";
import ListItems from "../../components/ListItems";
import Pagination from "../../components/Pagination";
import route from "../../config/route";
import utils from "../../utils";
type TypeProductProps = {
    type?: TypeProduct;
    types?: Type[];
    query?: SearchBody;
};
const TypeProductComponent: NextPage<TypeProductProps> = ({
    type,
    types,
    query,
}) => {
    const router = useRouter();
    const onPageChange = (page: number) => {
        router.push(
            utils.toUrl(`${route.SHOP}/${type?.slug}`, { ...query, page })
        );
    };
    return (
        <>
            <Header types={types ?? []} />
            <div className="_max-width flex _shops">
                <div className="_left">
                    <Sider types={types ?? []} />
                </div>
                <div className="_right">
                    <h1 className="px-5 text-2xl font-bold">{type?.name}</h1>
                    <div>{type && <ListItems items={type.product.docs} />}</div>
                    <div className="flex justify-center">
                        {type && (
                            <Pagination
                                onPageChange={onPageChange}
                                data={type.product}
                            />
                        )}
                    </div>
                </div>
                {/* <button>
                    <Link href={`${route.SHOP}?sort=-sold&page=2&limit=6`}>
                        <a>aaaaaa</a>
                    </Link>
                </button> */}
            </div>

            <Footer />
        </>
    );
};

TypeProductComponent.getInitialProps = async ({ query }: NextPageContext) => {
    try {
        const data = await Promise.all([
            await API.type.get(query.slug as string, {
                select: "_id name slug sold price img img1 isSale",
                ...query,
            }),
            await API.type.gets(),
        ]);
        return { type: data[0].data, types: data[1].data, query };
    } catch {
        return {};
    }
};

export default TypeProductComponent;
