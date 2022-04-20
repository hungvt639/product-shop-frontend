import { AxiosResponse } from "axios";
import AxiosAPI from "../config";

class CarouselAPI {
    private resource = "apiv1/carousel";

    public get = (): Promise<AxiosResponse<Carousel[]>> => {
        return AxiosAPI(true).get(`${this.resource}`);
    };
}

export default new CarouselAPI();

export interface Carousel {
    _id: string;
    image: string;
}

export class CreateCarousel {
    image: string;
    constructor(image: string) {
        this.image = image;
    }
}
