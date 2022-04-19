// type ObjectSearch = {
//     [select: string]: string|undefined;
// };

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

    public setItemStorage = (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    };
}
export default new Utils();
