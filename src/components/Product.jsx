import { useStateValue } from "../StateProvider";
import Ratings from "./Ratings";
import "./Product.css";

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
        <Ratings rating={rating} />
      </div>

      <img src={image} alt="product" />

      <button onClick={addToCart} className="hoverEffect">
        Add to cart
      </button>
    </div>
  );
}
