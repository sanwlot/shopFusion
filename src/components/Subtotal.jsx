import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { getCartTotal } from "../utilityFunctions";
import "./Subtotal.css";

export default function Subtotal() {
  const [{ cart }] = useStateValue();
  const navigate = useNavigate();

  const price = getCartTotal(cart) > 0 ? `$${getCartTotal(cart)}` : 0;

  return (
    <div className="subtotal">
      <p>
        Subtotal ({cart.length} items): <strong>{price}</strong>
      </p>
      <button onClick={() => navigate("/payment")} className="hoverEffect">
        Proceed to Checkout
      </button>
    </div>
  );
}
