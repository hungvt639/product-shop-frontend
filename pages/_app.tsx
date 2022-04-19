import "antd/dist/antd.css";
import "../styles/globals.css";
import "../styles/globals.scss";
import "../styles/container.scss";
import "../locales/i18n";
// import "../styles/antd-custom.less";
import store from "../store";
import { Provider } from "react-redux";
import { FC } from "react";

import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: any) => (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
);
export default MyApp;
// import { AppProps } from 'next/app'

// function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

// export default App
