import { AxiosResponse } from "axios";
import utils from "../../utils";
import AxiosAPI from "../config";
import { Pagination, SearchBody } from "../interface";
import { Product } from "./productAPI";

class TypeAPI {
    private resource = "apiv1/type";

    public gets = (): Promise<AxiosResponse<Type[]>> => {
        return AxiosAPI(true).get(`${this.resource}`);
    };
    public getsProduct = (
        obj?: SearchBody
    ): Promise<AxiosResponse<TypeProduct[]>> => {
        const str = utils.objToSearch(obj);

        return AxiosAPI(true).get(`${this.resource}/get-product${str}`);
    };
    public get = (
        slug: string,
        obj?: SearchBody
    ): Promise<AxiosResponse<TypeProduct>> => {
        const str = utils.objToSearch(obj);
        return AxiosAPI(true).get(`${this.resource}/${slug}${str}`);
    };
}

export default new TypeAPI();

export interface Type {
    _id: string;
    name: string;
    slug: string;
}
export interface TypeProduct extends Type {
    product: Pagination<Product>;
}
