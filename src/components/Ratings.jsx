import { v4 as uuidv4 } from "uuid";
export default function Ratings({ rating }) {
  function getRatings(productRating) {
    const ratings = Array(Math.ceil(productRating))
      .fill()
      .map(() => <p key={uuidv4()}>⭐️</p>);
    return ratings;
  }
  return <div className="product__rating">{getRatings(rating)}</div>;
}
