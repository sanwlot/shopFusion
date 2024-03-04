import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useStateValue } from "../StateProvider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import "./Header.css";

export default function Header({ setUserInputProduct }) {
  const [{ cart, user }, dispatch] = useStateValue();

  // sign out logic
  const handleSignOut = () => {
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
  };

  // parsing username from their email if they're logged in
  let username = user?.email.split("@")[0];

  // capitalizing their username if they're logged in
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
          <div onClick={handleSignOut} className="header__option">
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
