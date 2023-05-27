import style from "./Item.module.css";
import React from "react";
import { useDispatch } from "react-redux";
import { addOrder } from "../../Store/Action";

const Item = (props) => {
  let dispatch = useDispatch();
  const in_field_id = "input_field_" + props.id;
  const add_Order = () => {
    const quan = document.getElementById(in_field_id).value;
    dispatch(
      addOrder({
        id: props.id,
        name: props.name,
        quantity: quan,
        price: props.price,
      })
    );
    // dispatch(addOrder());
  };
  // console.log(Order_list);
  return (
    <React.Fragment>
      <div className={style.item_cont}>
        <div className={style.left_cont}>
          <h3>{props.name}</h3>
          <p>{props.desc}</p>
          <h2>Rs.{props.price}</h2>
        </div>
        <div className={style.right_cont}>
          <ul style={{ width: "100%", padding: "0" }}>
            <li>
              <input
                id={in_field_id}
                type={"number"}
                style={{ width: "40px" }}
                min="1"
                max="5"
                step="1"
                defaultValue="1"
              ></input>
            </li>
            <li>
              <h3>Amount</h3>
            </li>
          </ul>
          <button className={style.add_butt} onClick={add_Order}>
            + Add
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
          backgroundColor: "rgb(182, 182, 182)",
        }}
      ></hr>
    </React.Fragment>
  );
};

export default Item;
