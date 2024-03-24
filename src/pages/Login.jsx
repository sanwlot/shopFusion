import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "../firebase";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // handle sign in
  function signin(e) {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential) {
          // navigate to homepage after successful sign in
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
  }

  // handle registering a new user
  const register = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential) {
          // navigate to homepage after successful registration
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <div className="login__logo-container">Shop Fusion</div>
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login__signin-btn" onClick={signin} type="submit">
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the Shop Fusion Conditions of use & sale.
          Please see our privacy notice, our cookies notice and our interest
          baesed ads notice.
        </p>
        <button className="login__register-btn" onClick={register}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
