import { AxiosResponse } from "axios";
import AxiosAPI from "../config";

class SizeAPI {
    resource = "apiv1/size";

    public getTypes = (): Promise<AxiosResponse<Size[]>> => {
        return AxiosAPI(true).get(`${this.resource}`);
    };
}

export default new SizeAPI();

export interface Size {
    _id: string;
    name: string;
    slug: string;
}
