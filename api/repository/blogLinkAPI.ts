import { AxiosResponse } from "axios";
import utils from "../../utils";
import AxiosAPI from "../config";
import { SearchBody } from "../interface";

class BlogLinkAPI {
    private resource = "apiv1/blog-link";

    public gets = (obj?: SearchBody): Promise<AxiosResponse<BlogLink[]>> => {
        const str = utils.objToSearch(obj);
        return AxiosAPI(true).get(`${this.resource}${str}`);
    };
    public get = (slug: string): Promise<AxiosResponse<BlogLink>> => {
        return AxiosAPI(true).get(`${this.resource}/${slug}`);
    };
}

export default new BlogLinkAPI();

export interface BlogLink {
    name: string;
    content: string;
    _id: string;
    created_at: string;
    updated_at: string;
    slug: string;
}
