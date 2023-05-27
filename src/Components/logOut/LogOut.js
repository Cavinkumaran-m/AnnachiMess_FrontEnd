import style from "./LogOut.module.css";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../Store/Action";
import { useDispatch } from "react-redux";
import api from "../../API";

const LogOut = () => {
  const API = api + "/logout";
  let navigate = useNavigate();
  const dispatch = useDispatch();
  function logOutHandler() {
    fetch(API, { credentials: "include" })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "logout success") {
          dispatch(logOut());
          navigate("/");
        }
      });
  }
  return (
    <button className={style.logoutButt} onClick={logOutHandler}>
      Log out
    </button>
  );
};

export default LogOut;
