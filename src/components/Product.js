import { v4 as uuidv4 } from "uuid";
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

  const ratings = Array(Math.ceil(rating))
    .fill()
    .map(() => <p key={uuidv4()}>⭐️</p>);

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">{ratings}</div>
      </div>

      <img src={image} alt="product" />

      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}
