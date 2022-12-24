import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  orders: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  // console.log(action.item);
  if (action.type === "ADD_ORDER") {
    let flag = true;
    for (let i = 0; i < state.orders.length; i++) {
      if (state.orders[i]["name"] === action.item["name"]) {
        flag = false;
        state.orders[i]["quantity"] =
          parseInt(state.orders[i]["quantity"]) +
          parseInt(action.item["quantity"]);
        const updatedOrders = state.orders;
        const updatedTotalPrice =
          state.totalAmount + action.item.price * action.item.quantity;
        return { orders: updatedOrders, totalAmount: updatedTotalPrice };
      }
    }
    if (flag === true) {
      const updatedOrders = state.orders.concat(action.item);
      const updatedTotalPrice =
        state.totalAmount + action.item.price * action.item.quantity;
      return { orders: updatedOrders, totalAmount: updatedTotalPrice };
    }
  } else if (action.type === "INC_ORDER") {
    for (let i = 0; i < state.orders.length; i++) {
      // console.log(state.orders[i]["name"] + " " + action.item);
      if (state.orders[i]["name"] === action.item) {
        state.orders[i]["quantity"] =
          parseInt(state.orders[i]["quantity"]) + parseInt(1);
        const updatedOrders = state.orders;
        const updatedTotalPrice = state.totalAmount + state.orders[i]["price"];
        return { orders: updatedOrders, totalAmount: updatedTotalPrice };
      }
    }
  } else if (action.type === "REMOVE_ORDER") {
    for (let i = 0; i < state.orders.length; i++) {
      // console.log(state.orders[i]["name"] + " " + action.item);
      if (state.orders[i]["name"] === action.item) {
        if (state.orders[i]["quantity"] > 1) {
          state.orders[i]["quantity"] =
            parseInt(state.orders[i]["quantity"]) - parseInt(1);
          const updatedOrders = state.orders;
          const updatedTotalPrice =
            state.totalAmount - state.orders[i]["price"];
          return { orders: updatedOrders, totalAmount: updatedTotalPrice };
        } else {
          const filteredOrders = state.orders.filter(
            (item) => item["name"] !== action.item
          );
          const updatedOrders = filteredOrders;
          const updatedTotalPrice =
            state.totalAmount - state.orders[i]["price"];
          return { orders: updatedOrders, totalAmount: updatedTotalPrice };
        }
      }
    }
  }

  return defaultCartState;
};
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  // console.log(cartState);
  const addOrderHandler = (item) => {
    dispatchCartAction({ type: "ADD_ORDER", item: item });
  };
  const incrementOrderHandler = (item) => {
    dispatchCartAction({ type: "INC_ORDER", item: item });
  };
  const removeOrderHandler = (item) => {
    dispatchCartAction({ type: "REMOVE_ORDER", item: item });
  };

  const cartContext = {
    orders: cartState.orders,
    totalAmount: cartState.totalAmount,
    addOrder: addOrderHandler,
    incOrder: incrementOrderHandler,
    removeOrder: removeOrderHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
