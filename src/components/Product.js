import "./Product.css";
import { useStateValue } from "../StateProvider";

export default function Product({ id, title, price, image, rating }) {
  const [{ cart }, dispatch] = useStateValue();

  const addToCart = () => {
    // dispatch the item to the data layer
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p key={Math.random()}>⭐️</p>
            ))}
        </div>
      </div>

      <img src={image} alt="product" />

      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}
