import { useStateValue } from "../StateProvider";
import { v4 as uuidv4 } from "uuid";
import "./CheckoutProduct.css";

export default function CheckoutProduct({
  id,
  title,
  price,
  image,
  rating,
  hideButton,
}) {
  const [{ cart }, dispatch] = useStateValue();
  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  return (
    <div className="checkout-product">
      <img
        className="checkout-product__image"
        src={image}
        alt="checkout product"
      />
      <div className="checkout-product__info">
        <p className="checkout-product__title">{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(Math.floor(rating))
            .fill()
            .map(() => (
              <p key={uuidv4()}>⭐️</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromCart}>Remove from cart</button>
        )}
      </div>
    </div>
  );
}
