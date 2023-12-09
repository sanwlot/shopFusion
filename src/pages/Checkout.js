import "./Checkout.css";
import { useStateValue } from "../StateProvider";
import Subtotal from "../components/Subtotal";
import CheckoutProduct from "../components/CheckoutProduct";

export default function Checkout() {
  const [{ cart, user }, dispatch] = useStateValue();

  const CheckoutProducts = cart.map((item) => {
    return (
      <CheckoutProduct
        key={Math.random()}
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
        <img
          className="checkout__ad"
          src="https://www.webfx.com/wp-content/uploads/2021/10/amazon-ad-network.png"
          alt="advertisement"
        />

        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>
          {CheckoutProducts}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}
