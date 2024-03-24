import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import { v4 as uuidv4 } from "uuid";
import "./Order.css";

export default function Order({ order }) {
  const CheckoutProducts = order.cart.map((item) => {
    return (
      <CheckoutProduct
        key={uuidv4()}
        id={item.id}
        price={item.price}
        rating={item.rating}
        title={item.title}
        image={item.image}
        hideButton
      />
    );
  });

  return (
    <div className="order">
      <h2 className="order-h2">Order</h2>
      <p>{moment.unix(order.created).format("MMMM Do YYYY, h:mm")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {CheckoutProducts}
      <p className="order__total">
        Order Total: <strong>{`$${order.amount / 100}`}</strong>
      </p>
    </div>
  );
}
