import { AiOutlineSearch } from "react-icons/ai";
import useSearch from "../../../hooks/useSearch";
const Search = () => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    const { setValue, value } = useSearch();
    return (
        <form
            className="flex flex-row overflow-hidden rounded-md max-w-xs w-full"
            onSubmit={onSubmit}
        >
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="rounded-l-md"
                placeholder="Tìm kiếm sản phẩm..."
            />
            <button className="text-white px-4">
                <AiOutlineSearch />
            </button>
        </form>
    );
};
export default Search;
