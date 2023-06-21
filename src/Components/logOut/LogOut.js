import style from "./LogOut.module.css";
import { useNavigate } from "react-router-dom";
import { fetchLogOut } from "../APIs/API_fetches";
import { logOut } from "../../Store/Action";
import { useDispatch } from "react-redux";

const LogOut = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  function logOutHandler() {
    fetchLogOut().then((reply) => {
      if (reply) {
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
