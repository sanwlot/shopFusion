import moment from "moment";
import "./Order.css";
import CheckoutProduct from "./CheckoutProduct";

export default function Order({ order }) {
  const CheckoutProducts = order.cart.map((item) => {
    return (
      <CheckoutProduct
        key={Math.random()}
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
      <h2>Order</h2>
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
