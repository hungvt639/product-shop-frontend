import { AxiosResponse } from "axios";
import AxiosAPI from "../config";

class BlogLinkAPI {
    private resource = "apiv1/blog-link";

    public gets = (): Promise<AxiosResponse<BlogLink[]>> => {
        return AxiosAPI(true).get(`${this.resource}`);
    };
    public get = (slug: string): Promise<AxiosResponse<BlogLink[]>> => {
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
