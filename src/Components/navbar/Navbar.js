import Cart from "./Cart";
import style from "./Navbar.module.css";
import LogOut from "../logOut/LogOut";

const Navbar = (props) => {
  return (
    <div className={style.navbar}>
      <div className={style.head_cont}>
        <p>Annachi's React Mess</p>
      </div>
      <div className={style.cart_cont}>
        {props.logged && <LogOut></LogOut>}
        {props.logged && <Cart cart_ch={props.cart_ch}></Cart>}
      </div>
    </div>
  );
};

export default Navbar;
