import { AxiosResponse } from "axios";
import AxiosAPI from "../config";

class CarouselAPI {
    private resource = "apiv1/carousel";

    public get = (): Promise<AxiosResponse<Carousel[]>> => {
        return AxiosAPI(true).get(`${this.resource}`);
    };

    // public create = (
    //     data: CreateCarousel
    // ): Promise<AxiosResponse<Carousel>> => {
    //     return AxiosAPI(true).post(`${this.resource}`, data);
    // };

    // public editCarousel = (
    //     id: string,
    //     data: CreateCarousel
    // ): Promise<AxiosResponse<Carousel>> => {
    //     return AxiosAPI(true).put(`${this.resource}/${id}`, data);
    // };

    // public deleteCarousel = (id: string): Promise<AxiosResponse<any>> => {
    //     return AxiosAPI(true).delete(`${this.resource}/${id}`);
    // };
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
