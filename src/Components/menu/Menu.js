import style from "./Menu.module.css";
import Item from "./Item";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../Store/Action";
import api from "../../API";
import { useSelector } from "react-redux";

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
  const apiLogin = api + "/login";
  const apigetData = api + "/getData";
  let navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isFetched) {
      fetch(apiLogin, { credentials: "include" })
        .then((response) => response.json())
        .then((response) => {
          if (!response.loggedIn) {
            navigate("/");
          } else {
            fetch(apigetData, {
              credentials: "include",
            })
              .then((res) => {
                return res.json();
              })
              .then((parsedData) => {
                console.log("home : " + parsedData);
                dispatch(
                  logIn(
                    parsedData["orders"],
                    parsedData["totalAmount"],
                    parsedData["totalItems"]
                  )
                );
                navigate("/home");
              });
          }
        });
    }
  }, []);

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
