import style from "./LogOut.module.css";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../Store/Action";
import { useDispatch } from "react-redux";

const LogOut = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  function logOutHandler() {
    fetch("http://localhost:8080/logout", { credentials: "include" })
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
