type DropdownProps = {
    children: JSX.Element;
    overlay: JSX.Element | string | undefined;
    placement?: "top100_left" | "top_left100" | "top100_right";
};

function getplacement(
    placement?: "top100_left" | "top_left100" | "top100_right"
) {
    switch (placement) {
        case "top100_right":
            return { top: "100%", right: 0 };
        case "top_left100":
            return { top: 0, left: "100%" };
        case "top100_left":
            return { top: "100%", left: 0 };
        default: {
            return { top: "100%", left: 0 };
        }
    }
}

const Dropdown = (props: DropdownProps) => {
    const { children, overlay, placement } = props;

    return (
        <div className="_dropdown _scrollbar">
            {children}
            <div style={getplacement(placement)} className="overlay">
                <div className="overlay-content">{overlay}</div>
            </div>
        </div>
    );
};

export default Dropdown;
