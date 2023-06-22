import React from "react";
import style from "./Cart.module.css";
import Counter from "./Counter";
import cart_img from "../../images/cart3.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cart = (props) => {
  let items = useSelector((Store) => Store);
  const [btnAnime, setBtnAnime] = useState(true);
  const butt_classes = `${style.butt_cont} ${btnAnime ? style.bump : ""}`;

  useEffect(() => {
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
        <img src={cart_img} alt={"Cart"} />
        <span>Your Cart</span>
        <Counter></Counter>
      </button>
    </div>
  );
};

export default Cart;
