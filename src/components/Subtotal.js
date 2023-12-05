import { useStateValue } from "../StateProvider";
import "./Subtotal.css";
import { getCartTotal } from "../reducer";

export default function Subtotal() {
  const [{ cart }, dispatch] = useStateValue();

  const price = getCartTotal(cart) > 0 ? `$${getCartTotal(cart)}` : 0;

  return (
    <div className="subtotal">
      <p>
        Subtotal ({cart.length} items): <strong>{price}</strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift
      </small>
      <button>Proceed to Checkout</button>
    </div>
  );
}
