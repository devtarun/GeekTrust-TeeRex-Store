import { useCart } from "../../state/cart";
import Layout from "../layout";
import "./Cart.scss";
export default function Cart() {
  const { cart, removeItem, changeQuantity, emptyCart } = useCart();

  const isEmpty = cart.length === 0;

  // ------Total Product Incart and Total Price of cart
  const cartTotalQty = cart.reduce((acc, data) => acc + data.sel_qty, 0);
  const cartTotalAmount = cart.reduce(
    (acc, data) => acc + data.price * data.sel_qty,
    0
  );

  return (
    <Layout layoutClassName="flex_col">
      <div className="Cart-Container">
        <div className="Header">
          <h3 className="Heading">Shopping Cart</h3>
          {!isEmpty && (
            <h5 className="Action" onClick={(_) => emptyCart()}>
              Remove all
            </h5>
          )}
        </div>

        {isEmpty ? (
          <div className="empty_cart">Your cart is empty</div>
        ) : (
          cart.map((prd, idx) => {
            return (
              <div className="Cart-Items" key={idx}>
                <div className="image-box">
                  <img src={prd.imageURL} style={{ height: "120px" }} />
                </div>
                <div className="about">
                  <h1 className="title">{prd.name}</h1>
                  <small>Items in stock ({prd.max_qty})</small>
                </div>
                <div className="counter">
                  <button
                    className="btn"
                    disabled={prd.sel_qty === 1}
                    onClick={(_) => changeQuantity(prd.id, prd.sel_qty - 1)}
                  >
                    -
                  </button>
                  <div className="count">{prd.sel_qty}</div>
                  <button
                    className="btn"
                    disabled={prd.sel_qty === prd.max_qty}
                    onClick={(_) => changeQuantity(prd.id, prd.sel_qty + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="prices">
                  <div className="amount">₹{prd.sel_qty * prd.price}</div>
                  <button
                    className="remove"
                    onClick={(_) => removeItem(prd.id)}
                  >
                    <u>Remove</u>
                  </button>
                </div>
              </div>
            );
          })
        )}

        {!isEmpty && (
          <>
            <hr />
            <div class="checkout">
              <div class="total">
                <div>
                  <div class="Subtotal">Sub-Total</div>
                  <div class="items">{cartTotalQty} items</div>
                </div>
                <div class="total-amount">₹{cartTotalAmount}</div>
              </div>
              <button class="checkout_button">Checkout</button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
