import { AxiosResponse } from "axios";
import AxiosAPI from "../config";

class ColorAPI {
    resource = "apiv1/color";

    public getColor = (): Promise<AxiosResponse<Color[]>> => {
        return AxiosAPI(true).get(`${this.resource}`);
    };

    public createColor = (data: CreateColor): Promise<AxiosResponse<Color>> => {
        return AxiosAPI(true).post(`${this.resource}`, data);
    };

    public editColor = (id: string): Promise<AxiosResponse<Color>> => {
        return AxiosAPI(true).put(`${this.resource}/${id}`);
    };

    public deleteColor = (id: string): Promise<AxiosResponse<any>> => {
        return AxiosAPI(true).delete(`${this.resource}/${id}`);
    };
}

export default new ColorAPI();

export interface Color {
    _id: string;
    name: string;
    code: string;
}

class CreateColor {
    name: string;
    code: string;
    constructor({ name, code }: CreateColor) {
        this.name = name;
        this.code = code;
    }
}
