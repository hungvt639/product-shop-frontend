import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import API from "../api";
import { SearchBody } from "../api/interface";
import { SearchResponse } from "../api/repository/productAPI";
import route from "../config/route";
import utils from "../utils";

const useSearch = (valueSearch?: SearchResponse, query?: SearchBody) => {
    const router = useRouter();
    const [value, setValue] = useState<string>();
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const [searchRes, setSearchRes] = useState<SearchResponse | undefined>(
        valueSearch
    );

    const delay = 1000;
    const search = useCallback(async () => {
        if (typeof value !== "undefined") {
            if (timer) clearTimeout(timer);
            setTimer(
                setTimeout(async () => {
                    try {
                        const res = await API.product.search({
                            ...query,
                            search: value,
                        });
                        setSearchRes(res.data);
                    } catch {
                        setSearchRes(new SearchResponse());
                    }
                }, delay)
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const onSubmit = useCallback(() => {
        router.push(utils.toUrl(route.SEARCH, { ...query, search: value }));
    }, [query, router, value]);

    useEffect(() => {
        search();
    }, [search]);

    return { value, setValue, searchRes, onSubmit };
};
export default useSearch;
