import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { getCartTotal } from "../reducer";
import "./Subtotal.css";

export default function Subtotal() {
  const [{ cart }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const price = getCartTotal(cart) > 0 ? `$${getCartTotal(cart)}` : 0;

  return (
    <div className="subtotal">
      <p>
        Subtotal ({cart.length} items): <strong>{price}</strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift
      </small>
      <button onClick={() => navigate("/payment")} className="hoverEffect">
        Proceed to Checkout
      </button>
    </div>
  );
}
