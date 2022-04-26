const withAntdLess = require("next-plugin-antd-less");
module.exports = withAntdLess({
    lessVarsFilePath: "./styles/antd-custom.less",
    cssLoaderOptions: {},

    webpack(config) {
        return config;
    },
});
/**
 * @type {import('next').NextConfig}
 **/

// module.exports = {
//     reactStrictMode: true,
//     images: {
//         domains: ["http://localhost:3000", "http://be-dev.hung-vt.bike:8000"],
//     },
//     env: {
//         BACKEND: "http://be-dev.hung-vt.bike",
//         PORT_BACKEND: 8000,
//         URL_UPLOAD_FILE: "http://be-dev.hung-vt.bike:8000/file/upload",
//     },
// };

module.exports = {
    reactStrictMode: true,
    images: {
        domains: [
            "http://104.215.155.198:3000",
            "http://104.215.155.198:8000",
            "http://104.215.155.198",
        ],
    },
    env: {
        BACKEND: "http://104.215.155.198",
        PORT_BACKEND: 8000,
        URL_UPLOAD_FILE: "http://104.215.155.198:8000/file/upload",
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};
