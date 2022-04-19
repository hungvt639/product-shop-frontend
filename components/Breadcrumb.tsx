import Link from "next/link";
import route from "../config/route";

type BreadcrumbProps = {
    data: {
        name: string;
        link: string;
    }[];
};
const BreadcrumbComponent = (props: BreadcrumbProps) => {
    const { data } = props;
    return (
        <div className="w-full _breadcrumb mb-5">
            <div className="_max-width py-2 flex">
                <Link href={route.HOME}>
                    <a>Trang chủ</a>
                </Link>
                <div className="mx-2">/</div>
                {data.map((d, i) => (
                    <div className="flex" key={i}>
                        <Link href={d.link}>
                            <a>{d.name}</a>
                        </Link>
                        {i !== data.length - 1 && <div className="mx-2">/</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default BreadcrumbComponent;
