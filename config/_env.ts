const _env = {
    BACKEND: process.env.BACKEND || "http://localhost",
    PORT_BACKEND: process.env.PORT_BACKEND || 3000,
    PHONE_NUMBER: "0123456789",
    EMAIL: "abcxyz@gmail.com",
    SHOP_NAME: "Shop Uyn",
};
console.log("e", _env);

export default _env;
