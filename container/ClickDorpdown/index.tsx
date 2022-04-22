import { useState } from "react";

type DropdownProps = {
    children: JSX.Element;
    overlay: JSX.Element | string | undefined;
    className?: string;
};

const ClickDropdown = (props: DropdownProps) => {
    const { children, overlay, className } = props;
    const [show, setShow] = useState(false);

    return (
        <div className={"_click-dropdown _scrollbar " + className ?? ""}>
            <div className="w-full" onClick={() => setShow(!show)}>
                {children}
            </div>
            <div className={"overlay " + (show ? "show" : "not-show")}>
                <div className="overlay-content">{overlay}</div>
            </div>
        </div>
    );
};

export default ClickDropdown;
