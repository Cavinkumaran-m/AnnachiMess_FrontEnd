import { useState } from "react";
import CartProvider from "./Context/CartProvider";
import Navbar from "./Components/navbar/Navbar";
import Info_card from "./Components/Info_card";
import Menu from "./Components/menu/Menu";
import Mycart from "./Components/cart/Mycart";
import styles from "./App.module.css";
import Footer from "./Components/footer/Footer";

function App() {
  const [cartStatus, changeCartStatus] = useState(false);

  if (cartStatus == true) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }

  return (
    <CartProvider>
      <div className={styles.main}>
        <Navbar cart_ch={changeCartStatus}></Navbar>
        <Info_card></Info_card>
        <Menu></Menu>
        {cartStatus && <Mycart cart_ch={changeCartStatus}></Mycart>}
      </div>
      <Footer></Footer>
    </CartProvider>
  );
}

export default App;
