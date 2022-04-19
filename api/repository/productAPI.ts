import { AxiosResponse } from "axios";
import utils from "../../utils";
import AxiosAPI from "../config";
import { Pagination, SearchBody } from "../interface";
import { Color } from "./colorAPI";
import { Type } from "./typeAPI";

class ProductAPI {
    resource = "apiv1/product";

    public gets = (
        obj?: SearchBody
    ): Promise<AxiosResponse<Pagination<Product>>> => {
        const str = utils.objToSearch(obj);
        return AxiosAPI(true).get(`${this.resource}${str}`);
    };

    public getProductSale = (): Promise<AxiosResponse<Pagination<Product>>> => {
        return AxiosAPI(true).get(`${this.resource}/sale`);
    };

    public getProduct = (slug: string): Promise<AxiosResponse<Product>> => {
        return AxiosAPI(true).get(`${this.resource}/${slug}`);
    };
}

export default new ProductAPI();

export interface Product {
    _id: string;
    name: string;
    img: string;
    img1: string;
    image: string[];
    price: number;
    sizes: string[];
    colors: Color[];
    type: Type;
    isSale: boolean;
    description: string;
    information: string;
    created_at: string;
    updated_at: string;
    slug: string;
    sames?: Product[];
}
