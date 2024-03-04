import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStateValue } from "./StateProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import Layout from "./components/Layout";

// Loading Stripe with publishable key
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
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

  // a state variable for tracking what user types in the product search input in the home page
  // variable is used by <Home /> component
  // setter function is used by <Header /> component, which is inside <Layout />
  const [userInputProduct, setUserInputProduct] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout setUserInputProduct={setUserInputProduct} />}>
          <Route
            path="/"
            element={<Home userInputProduct={userInputProduct} />}
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
