import { AxiosResponse } from "axios";
import utils from "../../utils";
import AxiosAPI from "../config";
import { Pagination, SearchBody } from "../interface";
import { Type } from "./typeAPI";

class ProductAPI {
    private resource = "apiv1/product";

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
    public search = async (
        obj: SearchBody
    ): Promise<AxiosResponse<SearchResponse>> => {
        const str = utils.objToSearch(obj);
        return AxiosAPI(true).get(`${this.resource}/search${str}`);
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

interface ProductSearch {
    _index: string;
    _id: string;
    _score: number;
    _source: {
        name: string;
        slug: string;
        img: string;
        img1: string;
        price: number;
        type: {
            _id: string;
            name: string;
            created_at: string;
            updated_at: string;
            slug: string;
        };
        isSale: boolean;
        sold: number;
    };
}

export interface SearchResponse {
    total: number;
    max_score: number;
    hits: ProductSearch[];
    extTotal: {
        value: number;
        relation: string;
    };
}
export interface Color {
    _id: string;
    name: string;
    code: string;
}
