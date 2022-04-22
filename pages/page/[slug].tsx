import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import API from "../../api";
import { BlogLink } from "../../api/repository/blogLinkAPI";
import { Type } from "../../api/repository/typeAPI";
import BreadcrumbComponent from "../../components/Breadcrumb";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import route from "../../config/route";
import _env from "../../config/_env";
import ClickDropdown from "../../container/ClickDorpdown";

type BlogLinkComponentProps = {
    types?: Type[];
    pathname: string;
    asPath?: string;
    blogLinks?: BlogLink[];
    blog?: BlogLink;
};

const BlogLinkComponent: NextPage<BlogLinkComponentProps> = (props) => {
    const { pathname, asPath, blogLinks, types, blog } = props;
    const breadcrumb = useMemo(() => {
        return [
            {
                name: blog?.name ?? "",
                link: `${route.PAGE}/${blog?.slug}`,
            },
        ];
    }, [blog?.name, blog?.slug]);

    const Menu = useMemo(() => {
        return (
            <div>
                <Link href={route.SEARCH}>
                    <a>
                        <div className="text-base font-semibold py-1 px-2">
                            Tìm kiếm
                        </div>
                    </a>
                </Link>
                {blogLinks?.map((blogLink) => (
                    <Link
                        key={blogLink._id}
                        href={`${route.PAGE}/${blogLink.slug}`}
                    >
                        <a>
                            <div
                                className={`text-base font-semibold py-1 px-2${
                                    asPath?.startsWith(
                                        route.PAGE + "/" + blogLink.slug
                                    )
                                        ? " bg-stone-100"
                                        : ""
                                }`}
                            >
                                {blogLink.name}
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        );
    }, [asPath, blogLinks]);

    return (
        <>
            <Head>
                <title>{_env.SHOP_NAME}</title>
            </Head>
            <Header types={types ?? []} pathname={pathname} asPath={asPath} />
            <BreadcrumbComponent data={breadcrumb} />

            <div className="_max-width flex flex-wrap _pages">
                <div className="pb-5 _left">
                    <div className="_small border px-5 py-5">
                        <ClickDropdown overlay={Menu}>
                            <h1 className="text-center font-bold text-lg border-b-4 border-black mb-5 flex justify-center items-center">
                                <span>DANH MỤC TRANG</span>
                                <BsChevronCompactDown className="text-2xl font-bold ml-3" />
                            </h1>
                        </ClickDropdown>
                    </div>
                    <div className="_large border px-5 py-5">
                        <h1 className="text-center font-bold text-lg border-b-4 border-black mb-5">
                            DANH MỤC TRANG
                        </h1>
                        {Menu}
                    </div>
                </div>
                <div className="px-5 pb-5 _right">
                    <h1 className="text-3xl font-bold pb-3">{blog?.name}</h1>
                    <div
                        className="dangerouslySetInnerHTML"
                        dangerouslySetInnerHTML={{
                            __html: blog?.content ?? "",
                        }}
                    ></div>
                </div>
            </div>

            <Footer blogLinks={blogLinks ?? []} />
        </>
    );
};

BlogLinkComponent.getInitialProps = async ({
    query,
    pathname,
    asPath,
}: NextPageContext) => {
    try {
        const data = await Promise.all([
            await API.type.gets(),
            await API.blog_link.gets({ select: "_id name slug" }),
            await API.blog_link.get(query.slug as string),
        ]);
        return {
            types: data[0].data,
            blogLinks: data[1].data,
            blog: data[2].data,
            pathname,
            asPath,
        };
    } catch {
        return { pathname, asPath };
    }
};
export default BlogLinkComponent;
