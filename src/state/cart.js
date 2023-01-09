import { createContext, useReducer, useContext } from "react";

// Create a context
const CartCtx = createContext(null);

// custom component to provide state via use reducer

export const CartState = (props) => {
  //initial state
  const initialState = {
    items: [
      {
        id: 1,
        name: "Black Polo",
        imageURL:
          "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/polo-tshirts.png",
        sel_qty: 1,
        max_qty: 3,
        price: 250,
        currency: "INR",
      },
    ],
  };

  const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_ITEM":
        return {
          ...state,
          items: [...state.items, action.item],
        };
      case "REMOVE_ITEM":
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.id),
        };
      case "CHANGE_QUANTITY":
        return {
          ...state,
          items: state.items.map((item) => {
            if (item.id === action.id) {
              return { ...item, sel_qty: action.quantity };
            }
            return item;
          }),
        };
      case "EMPTY_CART":
        return {
          ...state,
          items: [],
        };
      default:
        return state;
    }
  };

  // we create the state and dispatch
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", item });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  const changeQuantity = (id, quantity) => {
    dispatch({ type: "CHANGE_QUANTITY", id, quantity });
  };

  const emptyCart = () => {
    dispatch({ type: "EMPTY_CART" });
  };

  return (
    <CartCtx.Provider
      value={{
        cart: state.items,
        addItem,
        removeItem,
        changeQuantity,
        emptyCart,
      }}
    >
      {props.children}
    </CartCtx.Provider>
  );
};

// custom hook, to get the context
export const useCart = () => {
  return useContext(CartCtx);
};
