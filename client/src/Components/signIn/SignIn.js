import style from "./SignIn.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../Store/Action";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8080/login", { credentials: "include" })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        if (response.loggedIn) {
          fetch("http://localhost:8080/getData", { credentials: "include" })
            .then((res) => {
              return res.json();
            })
            .then((parsedData) => {
              // console.log("=====" + parsedData);
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
  }, []);

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
    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        email: emailVal,
        password: passwordVal,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.message === "Registeration unsuccessfull") {
          alert("Email Id Already in use");
        } else {
          alert("Account created successfully");
          changeSignIn(true);
        }
      })
      .catch((error) => console.log(error));
  }

  function SignInHandler() {
    let emailVal = document.getElementById("_mail").value;
    let passwordVal = document.getElementById("_pwd").value;
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        email: emailVal,
        password: passwordVal,
      }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response["message"] === "login success") {
          fetch("http://localhost:8080/getData", { credentials: "include" })
            .then((res) => {
              return res.json();
            })
            .then((parsedData) => {
              dispatch(
                logIn(
                  parsedData["orders"],
                  parsedData["totalAmount"],
                  parsedData["totalItems"]
                )
              );
              navigate("/home");
            });
        } else if (response["message"] === "login unsuccess") {
          alert("Incorrect Password");
        } else if (response["message"] === "No user found") {
          alert("No such User registered");
        }
      })
      .catch((error) => console.log(error));
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
