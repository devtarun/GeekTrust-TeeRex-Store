import { useCart } from "../../state/cart";
import "./ProductCard.scss";
export default function ProductCard({ data }) {
  const { cart, addItem, removeItem } = useCart();

  const inCart = cart.find((itm) => itm.id === data.id);

  return (
    <div className="product_card">
      <figure>
        <div className="product_img">
          <img src={data.imageURL} alt={data.name} />
          <figcaption>{data.name}</figcaption>
        </div>
        <div className="product_info">
          <span>
            {data.currency === "INR" ? "₹ " : "USD "}
            {data.price}
          </span>
          <button
            style={{
              backgroundColor: inCart ? "#009688" : "#f44336",
            }}
            onClick={(e) => {
              e.preventDefault();
              if (inCart) {
                removeItem(data.id);
              } else {
                addItem({
                  id: data.id,
                  name: data.name,
                  imageURL: data.imageURL,
                  sel_qty: 1,
                  max_qty: data.quantity,
                  price: data.price,
                  currency: data.currency,
                });
              }
            }}
          >
            {inCart ? "Item added" : "Add to cart"}
          </button>
        </div>
      </figure>
    </div>
  );
}
