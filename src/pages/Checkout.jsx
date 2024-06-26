import { useStateValue } from "../StateProvider";
import CheckoutProduct from "../components/CheckoutProduct";
import Subtotal from "../components/Subtotal";
import { v4 as uuidv4 } from "uuid";
import { getUserName } from "../utilityFunctions";
import "./Checkout.css";

export default function Checkout() {
  const [{ cart, user }] = useStateValue();

  const CheckoutProducts = cart.map((item) => {
    return (
      <CheckoutProduct
        key={uuidv4()}
        id={item.id}
        price={item.price}
        rating={item.rating}
        title={item.title}
        image={item.image}
      />
    );
  });

  return (
    <div className="checkout">
      <div className="checkout__left">
        <div style={{ padding: "2em" }}>
          <h3 style={{ marginLeft: "0.5em" }}>Hello {getUserName(user)}</h3>
          <h2 className="checkout__title">Your Shopping Cart</h2>
          {CheckoutProducts}
        </div>
      </div>

      <div className="checkout__right" style={{ margin: "2em" }}>
        <Subtotal />
      </div>
    </div>
  );
}
