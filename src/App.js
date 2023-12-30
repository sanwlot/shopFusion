import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import "./App.css";

// Loading Stripe with publishable key
const stripePromise = loadStripe(
  "pk_test_51ONpPlSF7FnDkPDAMuJcf4kovoFMavBLv2OiWqqHqUixnaydE1Uov4IKWbAfj2dP0qfiJNdFN2HS2w8KVlmWPrlQ00kW0HOjxY"
);

export default function App() {
  // React Context API, here using dispatch for adding values to the state
  const [{}, dispatch] = useStateValue();

  // Authentication for user login status
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      // console.log("user is >>>>", user);

      if (user) {
        // User is signed in
        dispatch({
          type: "SET_USER",
          user: user,
        });
      } else {
        // User is signed out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* login should not display header */}
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/payment"
            element={
              // I didn't use the optional "option" attribute
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
