import { useCallback, useEffect, useState } from "react";
import API from "../api";
import { SearchResponse } from "../api/repository/productAPI";

const useSearch = () => {
    const [value, setValue] = useState("");
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const [searchRes, setSearchRes] = useState<SearchResponse>();

    const delay = 1000;
    const search = useCallback(async () => {
        if (value) {
            if (timer) clearTimeout(timer);

            setTimer(
                setTimeout(async () => {
                    const res = await API.product.search({ search: value });
                    console.log("SearchResponse", res.data);

                    setSearchRes(res.data);
                }, delay)
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useEffect(() => {
        search();
    }, [search]);

    return { value, setValue, searchRes };
};
export default useSearch;
