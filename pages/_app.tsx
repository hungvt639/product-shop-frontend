import "antd/dist/antd.css";
import "../styles/globals.css";
import "../styles/globals.scss";
import "../styles/responsive.scss";
import "../styles/container.scss";

import "../locales/i18n";
import store from "../store";
import { Provider } from "react-redux";
// import { FC } from "react";

import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
);
export default MyApp;
