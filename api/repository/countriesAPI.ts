import { AxiosResponse } from "axios";
import AxiosAPI from "../config";

class CountriesAPI {
    private resource = "apiv1/countries";
    public getProvincials = (): Promise<AxiosResponse<Provincial[]>> => {
        return AxiosAPI(false).get(`${this.resource}/provincials`);
    };
    public getDistricts = (id: string): Promise<AxiosResponse<District[]>> => {
        return AxiosAPI(false).get(`${this.resource}/districts/${id}`);
    };
    public getWards = (id: string): Promise<AxiosResponse<Ward[]>> => {
        return AxiosAPI(false).get(`${this.resource}/wards/${id}`);
    };
}
export default new CountriesAPI();

export interface Provincial {
    code: string;
    name: string;
    unit: string;
}
export interface District {
    code: string;
    name: string;
    unit: string;
    province_code: string;
    province_name: string;
    full_name: string;
}
export interface Ward {
    code: string;
    name: string;
    unit: string;
    district_code: string;
    district_name: string;
    province_code: string;
    province_name: string;
    full_name: string;
}
