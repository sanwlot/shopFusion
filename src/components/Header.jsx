import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useStateValue } from "../StateProvider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { getUserName } from "../utilityFunctions";
import "./Header.css";

export default function Header() {
  const [{ cart, user }, dispatch] = useStateValue();

  function handleSignOut() {
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
  }

  let signInStatus = user ? "Sign Out" : "Sign In";

  return (
    <div className="header">
      <Link to="/">
        <div className="logo-container">Shop fusion</div>
      </Link>

      <div className="header__search">
        <input
          className="header__search-input"
          type="text"
          onChange={(e) =>
            dispatch({
              type: "SET_USER_INPUT_PRODUCT_SEARCH",
              payload: e.target.value,
            })
          }
        />
        <SearchIcon className="header__search-icon" />
      </div>

      <div className="header__nav">
        {/* if user is not logged-in then link will take user to the login page */}
        <Link to={!user && "/login"}>
          <div onClick={handleSignOut} className="header__option">
            <span className="header__option-line-one">
              Hello {getUserName(user)}
            </span>
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
      </div>

      {user && cart.length > 0 && (
        <Link to="/checkout">
          <div className="header__option-cart">
            <span className="header__option-line-two header__cart-count">
              {cart?.length}
            </span>
            <ShoppingCartIcon className="header__option-cart-icon" />
          </div>
        </Link>
      )}
    </div>
  );
}
