import carouselAPI from "./repository/carouselAPI";
import countriesAPI from "./repository/countriesAPI";
import orderAPI from "./repository/orderAPI";
import productAPI from "./repository/productAPI";
import typeAPI from "./repository/typeAPI";

const API = {
    product: productAPI,
    type: typeAPI,
    carousel: carouselAPI,
    order: orderAPI,
    countries: countriesAPI,
};

export default API;
