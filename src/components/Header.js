import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { getAuth, signOut } from "firebase/auth";

export default function Header({ setUserInputProduct }) {
  const [{ cart, user }, dispatch] = useStateValue();

  // sign out logic
  const handleAuthentication = () => {
    const auth = getAuth();
    if (user) {
      signOut(auth)
        .then(() => {
          console.log("sign out successful");
        })
        .catch((error) => {
          alert(error);
        });
    }
    console.log(user);
  };

  // parsing username from their email if logged in
  let username = user?.email.split("@")[0];
  // capitalizing their username if logged in
  if (user) {
    username = username.charAt(0).toUpperCase() + username.slice(1);
  }

  //if user is not logged in then set it to Guest, else their username
  let displayName = user ? username : "Guest";

  // user sign-in status
  let signInStatus = user ? "Sign Out" : "Sign In";

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon logo"
        />
      </Link>

      <div className="header__search">
        <input
          className="header__search-input"
          type="text"
          onChange={(e) => setUserInputProduct(e.target.value)}
        />
        <SearchIcon className="header__search-icon" />
      </div>

      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__option-line-one">Hello {displayName}</span>
            <span className="header__option-line-two">{signInStatus}</span>
          </div>
        </Link>

        {user && (
          <Link to="/orders">
            <div className="header__option">
              <span className="header__option-line-one">Returns</span>
              <span className="header__option-line-two">& Orders</span>
            </div>
          </Link>
        )}

        {/* <div className="header__option">
          <span className="header__option-line-one">Your</span>
          <span className="header__option-line-two">Prime</span>
        </div> */}
      </div>

      {user && cart.length > 0 && (
        <Link to="/checkout">
          <div className="header__option-cart">
            <ShoppingCartIcon className="header__option-cart-icon" />
            <span className="header__option-line-two header__cart-count">
              {cart?.length}
            </span>
          </div>
        </Link>
      )}
    </div>
  );
}
