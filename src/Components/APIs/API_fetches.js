import { logOut, logIn } from "../../Store/Action";
import { useDispatch } from "react-redux";

// const api = "http://annachimesswebapp.azurewebsites.net";
const api = "http://localhost:80";
const apiUpdateOrder = api + "/updateOrder";
const apiLogOut = api + "/logout";
const apiLogin = api + "/login";
const apigetData = api + "/getData";
const apiRegister = api + "/register";

const fetchUpdateOrder = async (Orders, totalAmount, totalItems) => {
  return fetch(apiUpdateOrder, {
    credentials: "include",
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({
      orders: Orders,
      Amount: totalAmount,
      Item: totalItems,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res["message"] === "success") {
        alert("Your order has been placed successfully");
      }
    });
};

const fetchLogOut = async () => {
  return fetch(apiLogOut, { credentials: "include" })
    .then((res) => res.json())
    .then((res) => {
      if (res.message === "logout success") {
        return true;
      }
    });
};

const fetchLogIn = async () => {
  return fetch(apiLogin, { credentials: "include" })
    .then((response) => response.json())
    .then((response) => {
      if (!response.loggedIn) {
        return false;
      } else {
        return fetchGetData().then((reply) => {
          if (reply.fetched) {
            return reply.data;
          }
        });
      }
    });
};

const fetchLogInPost = async (emailVal, passwordVal) => {
  return fetch(apiLogin, {
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
        return fetchGetData().then((reply) => {
          if (reply.fetched) {
            return reply.data;
          }
        });
      } else if (response["message"] === "login unsuccess") {
        alert("Incorrect Password");
      } else if (response["message"] === "No user found") {
        alert("No such User Registered");
      } else {
        return 1;
      }
    })
    .catch((error) => console.log(error));
};

const fetchGetData = async () => {
  return fetch(apigetData, {
    credentials: "include",
  })
    .then((res) => {
      return res.json();
    })
    .then((parsedData) => {
      return {
        fetched: true,
        data: [
          parsedData["orders"],
          parsedData["totalAmount"],
          parsedData["totalItems"],
        ],
      };
    })
    .catch((error) => {
      console.log(error);
      return { fetched: false };
    });
};

const fetchRegister = async (emailVal, passwordVal) => {
  return fetch(apiRegister, {
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
        return false;
      } else {
        alert("Account created successfully");
        return true;
      }
    })
    .catch((error) => console.log(error));
};

export {
  fetchUpdateOrder,
  fetchLogOut,
  fetchLogIn,
  fetchGetData,
  fetchRegister,
  fetchLogInPost,
};

export default api;
