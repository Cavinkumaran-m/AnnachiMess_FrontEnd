import React from "react";

const CartContext = React.createContext({
  orders: [
    // {
    //   name: "Idly",
    //   price: 10,
    //   quantity: 1,
    //   id: "1",
    // },
    // {
    //   name: "Dosa",
    //   price: 20,
    //   quantity: 1,
    //   id: "2",
    // },
    // {
    //   name: "Pongal",
    //   price: 30,
    //   quantity: 1,
    //   id: "3",
    // },
  ],
  totalAmount: 0,
  addOrder: (order) => {},
  removeOrder: (order) => {},
});

export default CartContext;
