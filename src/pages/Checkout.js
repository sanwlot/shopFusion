import "./Checkout.css";
import { useStateValue } from "../StateProvider";
import Subtotal from "../components/Subtotal";
import CheckoutProduct from "../components/CheckoutProduct";
import { v4 as uuidv4 } from "uuid";

export default function Checkout() {
  const [{ cart, user }, dispatch] = useStateValue();

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
        {/* <img
          className="checkout__ad"
          src="https://www.webfx.com/wp-content/uploads/2021/10/amazon-ad-network.png"
          alt="advertisement"
        /> */}

        <div style={{ padding: "2em" }}>
          <h3 style={{ marginLeft: "0.5em" }}>
            Hello {user?.email.split("@")[0].toUpperCase()}
          </h3>
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
