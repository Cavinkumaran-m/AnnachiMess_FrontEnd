import React from "react";
import style from "./Cart.module.css";
import Counter from "./Counter";
import cart_img from "../../images/cart3.png";
import { useEffect, useState, useContext } from "react";
import CartContext from "../../Context/cart-context";

const Cart = (props) => {
  const [btnAnime, setBtnAnime] = useState(true);
  const Cartctx = useContext(CartContext);
  const items = Cartctx["totalAmount"];
  // console.log(items);
  const butt_classes = `${style.butt_cont} ${btnAnime ? style.bump : ""}`;

  useEffect(() => {
    // console.log("use effect");
    if (items.length === 0) {
      return;
    }
    setBtnAnime(true);
    const timer = setTimeout(() => {
      setBtnAnime(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  const OnClick = () => {
    props.cart_ch(true);
  };

  return (
    <div className={butt_classes}>
      <button className={style.cart} onClick={OnClick}>
        <img src={cart_img} />
        <span>Your Cart</span>
        <Counter></Counter>
      </button>
    </div>
  );
};

export default Cart;
