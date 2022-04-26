import {
    GetServerSideProps,
    GetServerSidePropsContext,
    NextPage,
    NextPageContext,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";
import API from "../../api";
import { SearchBody } from "../../api/interface";
import { BlogLink } from "../../api/repository/blogLinkAPI";
import { Type, TypeProduct } from "../../api/repository/typeAPI";
import BreadcrumbComponent from "../../components/Breadcrumb";
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
    resolvedUrl: string;
    blogLinks?: BlogLink[];
};

const TypeProductComponent: NextPage<TypeProductProps> = ({
    type,
    types,
    query,
    resolvedUrl,
    blogLinks,
}) => {
    const router = useRouter();

    const onPageChange = (page: number) => {
        router.push(
            utils.toUrl(`${route.SHOP}/${type?.slug}`, { ...query, page })
        );
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
            {
                name: type?.name ?? "",
                link: route.SHOP + "/" + type?.slug ?? "",
            },
        ];
    }, [type?.name, type?.slug]);

    return (
        <>
            <Head>
                <title>{type?.name}</title>
            </Head>
            <Header types={types ?? []} resolvedUrl={resolvedUrl} />
            <BreadcrumbComponent data={breadcrumb} />
            <div className="_max-width flex  flex-wrap _shops">
                <div className="_left">
                    <Sider types={types ?? []} resolvedUrl={resolvedUrl} />
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
            </div>
            <Footer blogLinks={blogLinks ?? []} />
        </>
    );
};

// TypeProductComponent.getInitialProps = async ({
//     query,
//     pathname,
//     asPath,
// }: NextPageContext) => {
//     try {
//         const data = await Promise.all([
//             await API.type.get(query.slug as string, {
//                 select: "_id name slug sold price img img1 isSale",
//                 ...query,
//             }),
//             await API.type.gets(),
//             await API.blog_link.gets({ select: "_id name slug" }),
//         ]);
//         return {
//             type: data[0].data,
//             types: data[1].data,
//             blogLinks: data[2].data,
//             query,
//             pathname,
//             asPath,
//         };
//     } catch {
//         return { pathname, asPath };
//     }
// };

export default TypeProductComponent;

export const getServerSideProps: GetServerSideProps<TypeProductProps> = async ({
    query,
    resolvedUrl,
}: GetServerSidePropsContext) => {
    try {
        const data = await Promise.all([
            await API.type.get(query.slug as string, {
                select: "_id name slug sold price img img1 isSale",
                ...query,
            }),
            await API.type.gets(),
            await API.blog_link.gets({ select: "_id name slug" }),
        ]);
        return {
            props: {
                type: data[0].data,
                types: data[1].data,
                blogLinks: data[2].data,
                query,
                resolvedUrl,
            },
        };
    } catch {
        return { props: { resolvedUrl } };
    }
};
