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
                    <a className="text-blue-500">TRANG CHỦ</a>
                </Link>
                <div className="mx-2">/</div>
                {data.map((d, i) => (
                    <div className="flex" key={i}>
                        {i !== data.length - 1 ? (
                            <>
                                <Link href={d.link}>
                                    <a className="text-blue-500">{d.name}</a>
                                </Link>
                                <div className="mx-2">/</div>
                            </>
                        ) : (
                            <p>{d.name} </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default BreadcrumbComponent;
