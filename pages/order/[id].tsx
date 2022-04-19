import { NextPage, NextPageContext } from "next";
import API from "../../api";
import { Order } from "../../api/repository/orderAPI";
import { Type } from "../../api/repository/typeAPI";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
type OrderProps = {
    order?: Order;
    types?: Type[];
};
const OrderDetailComponent: NextPage<OrderProps> = (props) => {
    const { order, types } = props;
    console.log("order", order);

    return (
        <>
            <Header types={types ?? []} />
            {order && <div className="_product  _max-width"></div>}

            <Footer />
        </>
    );
};
OrderDetailComponent.getInitialProps = async ({ query }: NextPageContext) => {
    try {
        const data = await Promise.all([
            await API.order.get(query.id as string),
            await API.type.gets(),
        ]);
        return { order: data[0].data, types: data[1].data };
    } catch {
        return {};
    }
};
export default OrderDetailComponent;
