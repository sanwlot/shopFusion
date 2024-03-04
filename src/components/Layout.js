import { Outlet } from "react-router-dom";
import Header from "./Header";

// we use <Layout /> because it helps us to add repeating elements/components in the webapp
// for example header and footer
// <Outlet /> is used for displaying all the children components in between <Layout />

export default function Layout({ setUserInputProduct }) {
  return (
    <>
      <Header setUserInputProduct={setUserInputProduct} />
      <Outlet />
    </>
  );
}
