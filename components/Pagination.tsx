import { Pagination } from "../api/interface";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

type PaginationProps = {
    data: Pagination;
    onPageChange?: (page: number) => void;
};

const PaginationComponent = (props: PaginationProps) => {
    const { data, onPageChange } = props;

    const pageChange = (value: number) => {
        if (onPageChange) {
            onPageChange(value);
        }
    };

    return (
        <div className="flex items-center text-base font-semibold pb-10 pt-5">
            {data.hasPrevPage && (
                <div
                    onClick={() => pageChange(data.page - 1)}
                    className="text-gray-500 mr-8 font-bold text-xl cursor-pointer"
                >
                    <BsArrowLeft />
                </div>
            )}
            {data.hasPrevPage && (
                <div
                    onClick={() => pageChange(data.page - 1)}
                    className="text-gray-500 mr-4  cursor-pointer"
                >
                    {data.page - 1}
                </div>
            )}

            <div>{data.page}</div>
            {data.hasNextPage && (
                <div
                    onClick={() => pageChange(data.page + 1)}
                    className="text-gray-500 ml-4  cursor-pointer"
                >
                    {data.page + 1}
                </div>
            )}
            {data.hasNextPage && (
                <div
                    onClick={() => pageChange(data.page + 1)}
                    className="text-gray-500 ml-8 font-bold text-xl  cursor-pointer"
                >
                    <BsArrowRight />
                </div>
            )}
        </div>
    );
};

export default PaginationComponent;
