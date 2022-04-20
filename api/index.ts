import carouselAPI from "./repository/carouselAPI";
import orderAPI from "./repository/orderAPI";
import productAPI from "./repository/productAPI";
import typeAPI from "./repository/typeAPI";

const API = {
    product: productAPI,
    type: typeAPI,
    carousel: carouselAPI,
    order: orderAPI,
};

export default API;
