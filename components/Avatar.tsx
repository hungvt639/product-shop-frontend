import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
type AvatarProps = {
    imgs: string[];
};

const AvatarComponent = (props: AvatarProps) => {
    const { imgs } = props;

    const [index, setIndex] = useState(0);

    return (
        <div className="flex flex-row">
            <div className="">
                {imgs.map((img, i) => (
                    <div
                        onClick={() => setIndex(i)}
                        className={`_avatar mb-2 cursor-pointer${
                            i === index ? " _index" : ""
                        }`}
                        key={i}
                    >
                        <img src={img} alt="avt" />
                    </div>
                ))}
            </div>
            <div className="w-full px-5 flex justify-center">
                <div className="_show-avatar">
                    <img src={imgs[index]} alt="avatar" />
                </div>
            </div>
        </div>
    );
};

export default AvatarComponent;
