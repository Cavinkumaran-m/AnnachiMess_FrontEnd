import style from "./Menu.module.css";
import Item from "./Item";
import React from "react";

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
