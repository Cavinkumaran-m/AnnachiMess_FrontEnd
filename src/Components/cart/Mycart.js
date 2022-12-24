import React from "react";
import Order from "./Order";
import style from "./Mycart.module.css";
import { useContext } from "react";
import CartContext from "../../Context/cart-context";

const Mycart = (props) => {
  const Onclick = () => {
    props.cart_ch(false);
  };

  const processOrder = () => {
    alert("Your order has been placed successfully");
  };
  const Orders_ = useContext(CartContext);
  const Orders = Orders_.orders;
  return (
    <React.Fragment>
      <div className={style.overlay} onClick={Onclick}></div>
      <div className={style.Mycart_cont}>
        {Orders.length === 0 && (
          <div>
            <h2 style={{ textAlign: "center" }}>No Items have been added...</h2>
          </div>
        )}
        <div className={style.Orders_cont}>
          {Orders.map((order) => (
            <Order
              name={order.name}
              price={order.price}
              quantity={order.quantity}
              key={order.id}
            ></Order>
          ))}
        </div>
        <div className={style.Total}>
          <div style={{ width: "100%" }}></div>
          <h2 style={{ float: "left", padding: "0 0 0 2%" }}>Total amount</h2>
          <h2 style={{ float: "right", padding: "0 2% 0 0" }}>
            Rs.
            {Orders_.totalAmount}
          </h2>
        </div>
        <div className={style.buttons}>
          <button className={style.order_butt} onClick={processOrder}>
            Order
          </button>
          <button className={style.close_butt} onClick={Onclick}>
            Close
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Mycart;
