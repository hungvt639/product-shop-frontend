import { AxiosResponse } from "axios";
import AxiosAPI from "../config";

class FileAPI {
    resource = "apiv1/file";

    public upload = (data: FormData): Promise<AxiosResponse<UploadImgur>> => {
        return AxiosAPI(true, "multipart/form-data").post(
            `${this.resource}`,
            data
        );
    };
}

export default new FileAPI();

interface UploadImgur {
    id: string;
    title: any;
    description: any;
    datetime: number;
    type: string;
    animated: false;
    width: number;
    height: number;
    size: number;
    views: number;
    bandwidth: number;
    vote: any;
    favorite: false;
    nsfw: any;
    section: any;
    account_url: any;
    account_id: number;
    is_ad: false;
    in_most_viral: false;
    has_sound: false;
    tags: [];
    ad_type: number;
    ad_url: string;
    edited: string;
    in_gallery: false;
    deletehash: string;
    name: string;
    link: string;
}
