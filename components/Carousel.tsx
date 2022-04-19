/* eslint-disable @next/next/no-img-element */
import { Carousel as CarouselCpn } from "antd";
import { Carousel } from "../api/repository/carouselAPI";

type CarouselProps = {
    carousels: Carousel[];
};

const CarouselComponent = ({ carousels }: CarouselProps) => {
    return (
        <div className="_carousels w-full">
            <CarouselCpn autoplay>
                {carousels.map((c) => (
                    <div className="carousel" key={c._id}>
                        <img src={c.image} alt="img" />
                    </div>
                ))}
            </CarouselCpn>
        </div>
    );
};
export default CarouselComponent;
