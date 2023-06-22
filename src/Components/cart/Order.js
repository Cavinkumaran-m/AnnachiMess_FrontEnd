import style from "./Order.module.css";
import { useDispatch } from "react-redux";
import { incrementOrder } from "../../Store/Action.js";
import { decrementOrder } from "../../Store/Action.js";

const Order = (props) => {
  let dispatch = useDispatch();
  const addItem = () => {
    dispatch(incrementOrder(props.name));
  };
  const removeItem = () => {
    dispatch(decrementOrder(props.name));
  };
  return (
    <div className={style.item_cont}>
      <div className={style.left_cont}>
        <h2>{props.name}</h2>
        <ul>
          <h3 style={{ color: " #5f1e02" }}>Rs.{props.price}</h3>
          <h3 className={style.count}>x{props.quantity}</h3>
        </ul>
      </div>
      <div className={style.right_cont}>
        <div className={style.butt_cont}>
          <button className={style.add_butt} onClick={addItem}>
            +
          </button>
          <button className={style.sub_butt} onClick={removeItem}>
            -
          </button>
        </div>
      </div>
      <hr
        className={style.line}
        style={{
          height: "2px",
          border: "none",
          margin: "0 2.5% 0 2.5%",
          width: "95%",
          backgroundColor: "#5f1e02",
        }}
      ></hr>
    </div>
  );
};

export default Order;
