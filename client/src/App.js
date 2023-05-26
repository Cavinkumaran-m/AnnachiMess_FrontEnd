import { useEffect, useState } from "react";
// import CartProvider from "./Context/CartProvider";
import Navbar from "./Components/navbar/Navbar";
import InfoCard from "./Components/info_Card";
import Menu from "./Components/menu/Menu";
import Mycart from "./Components/cart/Mycart";
import styles from "./App.module.css";
import Footer from "./Components/footer/Footer";
import SignIn from "./Components/signIn/SignIn";
import { useSelector } from "react-redux";

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

function App() {
  let loggedInStatus = useSelector((store) => store.loggedIn);
  const [cartStatus, changeCartStatus] = useState(false);
  // const [loggedIn, changeLoggedIn] = useState(loggedInStatus);
  useEffect(() => {
    document.title = "Annachi Mess";
  }, []);

  if (cartStatus === true) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }

  return (
    <>
      <div className={styles.main}>
        {/* <Navbar cart_ch={changeCartStatus} logged={loggedInStatus}></Navbar> */}
        <InfoCard></InfoCard>
        {/* {loggedIn && <Menu></Menu>}
        {!loggedIn && <SignIn></SignIn>} */}
        <BrowserRouter>
          <Navbar cart_ch={changeCartStatus} logged={loggedInStatus}></Navbar>
          <Routes>
            <Route exact path="/" Component={SignIn}></Route>
            <Route path="/home" Component={Menu}></Route>
            <Route path="*" Component={SignIn}></Route>
          </Routes>
        </BrowserRouter>
        {cartStatus && <Mycart cart_ch={changeCartStatus}></Mycart>}
        <hr style={{ color: "transparent", border: "0" }}></hr>
      </div>

      {/* <Footer></Footer> */}
    </>
  );
}

export default App;
