import style from "./Menu.module.css";
import Item from "./Item";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogIn } from "../APIs/API_fetches";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "../../Store/Action";

const Menu_data = [
  {
    dish_name: "Idly",
    desc: "Idly soft like Kushpu",
    price: 15,
    id: "1",
  },
  {
    dish_name: "Dosa",
    desc: "Delicious dosa as flat as earth ;)",
    price: 40,
    id: "2",
  },
  {
    dish_name: "Vada",
    desc: "Best thing you can ever get with a hole",
    price: 10,
    id: "3",
  },
  {
    dish_name: "Tea",
    desc: "Recharge yourself..",
    price: 15,
    id: "4",
  },
];

const Menu = () => {
  const isFetched = useSelector((store) => store.loggedIn);

  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    if (!isFetched) {
      fetchLogIn().then((reply) => {
        if (reply === false) {
          navigate("/");
        } else {
          dispatch(logIn(reply[0], reply[1], reply[2]));
          navigate("/home");
        }
      });
    }
  });

  return (
    <div className={style.menu_card}>
      {Menu_data.map((item) => (
        <Item
          name={item.dish_name}
          desc={item.desc}
          price={item.price}
          key={item.id}
          id={item.id}
        ></Item>
      ))}
    </div>
  );
};

export default Menu;
