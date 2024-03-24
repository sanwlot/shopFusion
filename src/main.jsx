import ReactDOM from "react-dom/client";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>
);
