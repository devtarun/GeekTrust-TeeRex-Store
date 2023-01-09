import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import { useCart } from "../state/cart";

const Layout = ({ children, layoutClass = "" }) => {
  const { cart } = useCart();
  return (
    <div className="App">
      <Header cartCount={cart.length} />
      <div className={`container ${layoutClass}`}>{children}</div>
    </div>
  );
};

export default Layout;
