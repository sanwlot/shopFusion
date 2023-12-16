import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./App.css";
import Checkout from "./pages/Checkout";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import Payment from "./pages/Payment";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51ONpPlSF7FnDkPDAMuJcf4kovoFMavBLv2OiWqqHqUixnaydE1Uov4IKWbAfj2dP0qfiJNdFN2HS2w8KVlmWPrlQ00kW0HOjxY"
);

export default function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log("user is >>>>", user);

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
              // i didnt use optional "option" attribute
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
