// type ObjectSearch = {
//     [select: string]: string|undefined;
// };

import { Order } from "../api/repository/orderAPI";
import { Cart } from "../store";

class Utils {
    public objToSearch = (obj: any | undefined) => {
        if (!obj) return "";
        const data = Object.keys(obj).map(function (key) {
            if (!obj[key]) return "";
            return `${key}=${obj[key]}`;
        });
        return "?" + data.filter((d) => d).join("&");
    };

    public toUrl = (url: string, search: any) => {
        return url + this.objToSearch(search);
    };

    public sumMoney = (carts: Cart[]) => {
        return carts.reduce(
            (sum, cart) => sum + cart.amount * cart.product.price,
            0
        );
    };

    public sumAmount = (carts: Cart[]) => {
        return carts.reduce((sum, cart) => sum + cart.amount, 0);
    };

    // public setItemStorage = (key: string, value: any) => {
    //     localStorage.setItem(key, JSON.stringify(value));
    // };

    public status = [
        { label: "Chờ xác nhận", color: "green" },
        { label: "Xác nhận", color: "green" },
        { label: "Đang giao", color: "green" },
        { label: "Nhận hàng", color: "green" },
        { label: "Đã hủy", color: "red" },
    ];
    public getTagStatus = (stt: number) => {
        return this.status[stt];
    };
    public formatDate(dateString: string) {
        const d = new Date(dateString);
        const year = d.getFullYear();
        const date = d.getDate();
        const month = d.getMonth();

        const h = d.getHours();
        const m = d.getMinutes();
        const s = d.getSeconds();
        return `${date}/${month}/${year} - ${h}:${m}:${s}`;
    }

    public getStatus(order: Order, i: number) {
        if (order.status === 4) return "error";
        if (order.status === i - 1) return "process";
        return order.status > i - 1 ? "finish" : "wait";
    }
}
export default new Utils();
