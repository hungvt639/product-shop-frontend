import { AiOutlineSearch } from "react-icons/ai";
const Search = () => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <form
            className="flex flex-row overflow-hidden rounded-md max-w-xs w-full"
            onSubmit={onSubmit}
        >
            <input
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
