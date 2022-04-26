import {
    GetServerSideProps,
    GetServerSidePropsContext,
    NextPage,
    NextPageContext,
} from "next";
import Head from "next/head";
import { Fragment, useCallback, useEffect, useMemo } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import API from "../api";
import { SearchBody } from "../api/interface";
import { BlogLink } from "../api/repository/blogLinkAPI";
import { SearchResponse } from "../api/repository/productAPI";
import { Type } from "../api/repository/typeAPI";
import BreadcrumbComponent from "../components/Breadcrumb";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import SearchItemComponent from "../components/SearchItem";
import route from "../config/route";
import _env from "../config/_env";
import useSearch from "../hooks/useSearch";

type SearchComponentProps = {
    types?: Type[];
    resolvedUrl: string;
    searchValue?: SearchResponse;
    query: SearchBody;
    blogLinks?: BlogLink[];
};

const SearchComponent: NextPage<SearchComponentProps> = (props) => {
    const { resolvedUrl, searchValue, types, query, blogLinks } = props;

    const { searchRes, setValue, value, onSubmit } = useSearch(
        searchValue,
        query
    );

    const onSubmitDefault = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onSubmit();
        },
        [onSubmit]
    );
    const breadcrumb = useMemo(() => {
        return [
            {
                name: "TÌM KIẾM",
                link: route.SEARCH,
            },
        ];
    }, []);
    return (
        <>
            <Head>
                <title>{_env.SHOP_NAME}</title>
            </Head>
            <Header types={types ?? []} resolvedUrl={resolvedUrl} />{" "}
            <BreadcrumbComponent data={breadcrumb} />
            <div className="_max-width">
                <h1 className="text-center font-bold text-2xl mt-10">
                    / TÌM KIẾM /
                </h1>
                <form
                    className="flex flex-row overflow-hidden rounded-sm max-w-xl mx-auto mt-5"
                    onSubmit={onSubmitDefault}
                >
                    <input
                        type="text"
                        value={
                            typeof value !== "undefined"
                                ? value
                                : query.search ?? ""
                        }
                        onChange={(e) => setValue(e.target.value)}
                        className="rounded-l-sm"
                        placeholder="Tìm kiếm sản phẩm..."
                    />
                    <button className="text-white px-4">
                        <AiOutlineSearch />
                    </button>
                </form>
                <div className="max-w-xl mx-auto mt-5 mb-10">
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
            <Footer blogLinks={blogLinks ?? []} />
        </>
    );
};

// SearchComponent.getInitialProps = async ({
//     query,
//     pathname,
//     asPath,
// }: NextPageContext) => {
//     try {
//         const data = await Promise.all([
//             query.search ? await API.product.search(query) : undefined,
//             await API.type.gets(),
//             await API.blog_link.gets({ select: "_id name slug" }),
//         ]);
//         return {
//             searchValue: data[0]?.data ?? undefined,
//             types: data[1].data,
//             blogLinks: data[2]?.data,
//             pathname,
//             asPath,
//             query,
//         };
//     } catch {
//         return { resolvedUrl, query };
//     }
// };

export default SearchComponent;

export const getServerSideProps: GetServerSideProps<
    SearchComponentProps
> = async ({ query, resolvedUrl }: GetServerSidePropsContext) => {
    try {
        const data = await Promise.all([
            query.search ? await API.product.search(query) : undefined,
            await API.type.gets(),
            await API.blog_link.gets({ select: "_id name slug" }),
        ]);
        return {
            props: {
                searchValue: data[0]?.data ?? undefined,
                types: data[1].data,
                blogLinks: data[2]?.data,
                resolvedUrl,
                query,
            },
        };
    } catch {
        return { props: { resolvedUrl, query } };
    }
};
