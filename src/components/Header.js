import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { getAuth, signOut } from "firebase/auth";

export default function Header() {
  const [{ cart, user }, dispatch] = useStateValue();

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

  let username = user?.email.split("@")[0];

  if (user) {
    username = username.charAt(0).toUpperCase() + username.slice(1);
  }

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
        <input className="header__search-input" type="text" />
        <SearchIcon className="header__search-icon" />
      </div>

      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__option-line-one">
              Hello {user ? username : "Guest"}
            </span>
            <span className="header__option-line-two">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__option-line-one">Returns</span>
          <span className="header__option-line-two">& Orders</span>
        </div>

        <div className="header__option">
          <span className="header__option-line-one">Your</span>
          <span className="header__option-line-two">Prime</span>
        </div>
      </div>

      <Link to="/checkout">
        <div className="header__option-cart">
          <ShoppingCartIcon className="header__option-cart-icon" />
          <span className="header__option-line-two header__cart-count">
            {cart?.length}
          </span>
        </div>
      </Link>
    </div>
  );
}
