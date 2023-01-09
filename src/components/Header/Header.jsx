import "./Header.scss";
import ShoppingCartIcon from "../../assets/icons/shoping-cart.svg";
import { Link } from "react-router-dom";

export default function Header({ cartCount }) {
  return (
    <header>
      <div className="logo">
        <h1>TeeRex Store</h1>
      </div>
      <div className="right">
        <Link to="/">Products</Link>
        <Link to="/cart">
          <div className="cart_btn">
            <img src={ShoppingCartIcon} alt="cart" />
            {cartCount === 0 ? null : (
              <small className="badge">{cartCount}</small>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
