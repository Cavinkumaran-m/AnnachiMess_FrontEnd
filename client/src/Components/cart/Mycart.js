import React from "react";
import Order from "./Order";
import style from "./Mycart.module.css";
import { useSelector } from "react-redux";

const Mycart = (props) => {
  let Orders = useSelector((Store) => Store.orders);
  let totalAmount = useSelector((Store) => Store.totalAmount);
  let totalItems = useSelector((Store) => Store.totalItems);
  const Onclick = () => {
    props.cart_ch(false);
  };

  const UpdateOrders = () => {
    fetch("http://localhost:8080/updateOrder", {
      credentials: "include",
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        orders: Orders,
        Amount: totalAmount,
        Item: totalItems,
      }),
    });
    alert("Your order has been placed successfully");
  };
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
        {Orders.length !== 0 && (
          <div className={style.Total}>
            <div style={{ width: "100%" }}></div>
            <h2 style={{ float: "left", padding: "0 0 0 2%" }}>Total amount</h2>
            <h2 style={{ float: "right", padding: "0 2% 0 0" }}>
              Rs.
              {totalAmount}
            </h2>
          </div>
        )}
        <div className={style.buttons}>
          <button className={style.order_butt} onClick={UpdateOrders}>
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
