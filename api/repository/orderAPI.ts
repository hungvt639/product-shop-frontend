import { AxiosResponse } from "axios";
import { Cart } from "../../store";
import AxiosAPI from "../config";

class OrderAPI {
    private resource = "apiv1/order";

    public create = (order: OrderCreate): Promise<AxiosResponse<any>> => {
        return AxiosAPI(false).post(`${this.resource}`, order);
    };
    public get = (id: string): Promise<AxiosResponse<any>> => {
        return AxiosAPI(false).get(`${this.resource}/detail/${id}`);
    };
}

export default new OrderAPI();

export interface Order {
    fullname: string;
    phone: string;
    email: string;
    address: string;
    status: number;
    price: number;
    orderProduct: {
        product: {
            name: string;
            slug: string;
            img: string;
            img1: string;
            price: number;
            type: string;
            _id: string;
        };
        amount: number;
        size: string;
        color: {
            name: string;
            code: string;
            _id: string;
        };
        _id: string;
    }[];

    ship: number;
    note: string;
    noteAdmin: string;
    _id: string;
    created_at: string;
    updated_at: string;
}

export interface OrderCreate {
    fullname: string;
    phone: string;
    email: string;
    address: string;
    note: string;
    orderProducts: OrderProducts[];
}
export class OrderProducts {
    product_id: string;
    amount: number;
    size: string;
    color: {
        _id: string;
        name: string;
        code: string;
    };
    constructor(cart: Cart) {
        this.product_id = cart.product._id;
        this.amount = cart.amount;
        (this.size = cart.size), (this.color = cart.color);
    }
}
