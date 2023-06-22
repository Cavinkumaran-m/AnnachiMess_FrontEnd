import style from "./SignIn.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogIn, fetchRegister, fetchLogInPost } from "../APIs/API_fetches";
import { useDispatch } from "react-redux";
import { logIn } from "../../Store/Action";

const SignIn = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    fetchLogIn().then((reply) => {
      if (reply !== false) {
        dispatch(logIn(reply[0], reply[1], reply[2]));
        navigate("/home");
      }
    });
  });

  const [isSignIn, changeSignIn] = useState(true);

  function SignInChanger() {
    if (isSignIn) {
      changeSignIn(false);
    } else {
      changeSignIn(true);
    }
  }

  function RegisterHandler() {
    let emailVal = document.getElementById("mail").value;
    let passwordVal = document.getElementById("pwd").value;
    let ConfirmpasswordVal = document.getElementById("pwd2").value;
    let pattern = /^\w+[@]{1}\w+[.]{1}\w+$/;
    if (!emailVal.match(pattern)) {
      alert("Enter a valid Email Id");
      return;
    }
    if (passwordVal !== ConfirmpasswordVal) {
      alert("Enter Passwords must match");
      return;
    }
    if (fetchRegister(emailVal, passwordVal)) {
      changeSignIn(true);
    }
  }

  function SignInHandler() {
    let emailVal = document.getElementById("_mail").value;
    let passwordVal = document.getElementById("_pwd").value;
    fetchLogInPost(emailVal, passwordVal).then((reply) => {
      if (reply != undefined) {
        dispatch(logIn(reply[0], reply[1], reply[2]));
        navigate("/home");
      }
    });
  }

  return (
    <div className={style.menu_card}>
      {isSignIn && (
        <div className={style.signIn}>
          <h2>Sign In</h2>
          <label>Email Id:</label>
          <input type={"email"} id={"_mail"}></input>
          <br></br>
          <br></br>
          <label>Password</label>
          <input type={"password"} id={"_pwd"}></input>
          <br></br>
          <br></br>
          <button onClick={SignInHandler}>Log In</button>
          <button onClick={SignInChanger}>Sign Up</button>
        </div>
      )}
      {!isSignIn && (
        <div className={style.signIn}>
          <h2>Sign Up</h2>
          <label>Enter Email Id:</label>
          <input type={"email"} id={"mail"}></input>
          <br></br>
          <br></br>
          <label>Enter Password</label>
          <input type={"password"} id={"pwd"}></input>
          <br></br>
          <br></br>
          <label>Re-Enter Password</label>
          <input type={"password"} id={"pwd2"}></input>
          <br></br>
          <br></br>
          <button onClick={RegisterHandler}>Register</button>
          <button onClick={SignInChanger}>Sign In</button>
        </div>
      )}
    </div>
  );
};

export default SignIn;
