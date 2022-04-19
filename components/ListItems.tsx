import { Product } from "../api/repository/productAPI";
import Item from "./Item";

type ListItemsProps = {
    items: Product[];
};
const ListItemsComponent = (props: ListItemsProps) => {
    const { items } = props;
    return (
        <div className="w-full flex flex-wrap">
            {items.map((item) => (
                <Item key={item._id} item={item} />
            ))}
        </div>
    );
};
export default ListItemsComponent;
