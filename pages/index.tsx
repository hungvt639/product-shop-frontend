/* eslint-disable @next/next/no-img-element */
import type {
    NextPage,
    NextPageContext,
    GetServerSidePropsContext,
} from "next";
import Head from "next/head";
import Link from "next/link";
import API from "../api";
import { Pagination } from "../api/interface";
import { BlogLink } from "../api/repository/blogLinkAPI";
import { Carousel } from "../api/repository/carouselAPI";
import { Product } from "../api/repository/productAPI";
import { Type } from "../api/repository/typeAPI";
import CarouselComponent from "../components/Carousel";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import ListItems from "../components/ListItems";
import route from "../config/route";
import _env from "../config/_env";

type HomeProps = {
    carousels?: Carousel[];
    products?: Pagination<Product>;
    types?: Type[];
    pathname: string;
    asPath?: string;
    blogLinks?: BlogLink[];
};

const HomeComponent: NextPage<HomeProps> = ({
    carousels,
    products,
    types,
    pathname,
    asPath,
    blogLinks,
}: HomeProps) => {
    return (
        <>
            <Head>
                <title>{_env.SHOP_NAME}</title>
            </Head>
            <Header types={types ?? []} pathname={pathname} asPath={asPath} />
            <CarouselComponent carousels={carousels ?? []} />
            <h1 className="text-center text-4xl font-bold my-9">
                <Link href={`${route.SHOP}?sort=-sold&page=1&limit=20`}>
                    <a>/ BEST SELLER /</a>
                </Link>
            </h1>
            <div className="_max-width">
                {products && <ListItems items={products.docs} />}
            </div>

            <Footer blogLinks={blogLinks ?? []} />
        </>
    );
};

export default HomeComponent;

HomeComponent.getInitialProps = async ({
    pathname,
    asPath,
}: NextPageContext) => {
    try {
        const data = await Promise.all([
            await API.product.gets({
                select: "_id name slug sold price img img1 isSale",
            }),
            await API.carousel.get(),
            await API.type.gets(),
            await API.blog_link.gets({ select: "_id name slug" }),
        ]);

        return {
            carousels: data[1].data,
            products: data[0].data,
            types: data[2].data,
            blogLinks: data[3].data,
            pathname,
            asPath,
        };
    } catch {
        return { pathname, asPath };
    }
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     console.log("c", context);

//     // const res = await fetch(`https://...`)
//     // const data = await res.json()

//     // if (!data) {
//     //   return {
//     //     notFound: true,
//     //   }
//     // }

//     return {
//         props: {}, // will be passed to the page component as props
//     };
// }
