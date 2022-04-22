import { FocusEvent, useCallback, useEffect, useState } from "react";

const useSearchHeader = () => {
    const [show, setShow] = useState(false);

    const onSubmitDefault = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
        },
        []
    );

    const close = useCallback(() => {
        setShow(false);
    }, []);

    const onShow = useCallback((e: FocusEvent<HTMLInputElement, Element>) => {
        e.stopPropagation();
        setShow(true);
    }, []);

    function defaultF(e: any) {
        e.stopPropagation();
    }

    useEffect(() => {
        if (show) {
            document.body.addEventListener("click", close, false);
        } else {
            document.body.removeEventListener("click", close, false);
        }
        return () => {
            document.body.removeEventListener("click", close, false);
        };
    }, [close, show]);

    return { onSubmitDefault, show, onShow, defaultF };
};
export default useSearchHeader;
