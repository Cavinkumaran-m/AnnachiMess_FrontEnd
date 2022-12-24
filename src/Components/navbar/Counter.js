import style from "./Counter.module.css";
import CartContext from "../../Context/cart-context";
import { useContext } from "react";

const Counter = () => {
  const cartCtx = useContext(CartContext);
  const numberOfItems = cartCtx.orders.reduce((currNumber, item) => {
    return parseInt(currNumber) + parseInt(item.quantity);
  }, 0);

  return (
    <div className={style.counter}>
      <h3>{numberOfItems}</h3>
    </div>
  );
};

export default Counter;
