const intitialState = {
  orders: [],
  totalAmount: 0,
  totalItems: 0,
  loggedIn: false,
};

function StoreReducer(state = intitialState, action) {
  if (action.type === "login") {
    return {
      orders: action.orders,
      totalAmount: action.amount,
      totalItems: action.items,
      loggedIn: true,
    };
  }

  if (action.type === "logout") {
    return intitialState;
  }

  if (action.type === "add") {
    let flag = true;
    for (let i = 0; i < state.orders.length; i++) {
      if (state.orders[i]["name"] === action.item["name"]) {
        flag = false;
        state.orders[i]["quantity"] =
          parseInt(state.orders[i]["quantity"]) +
          parseInt(action.item["quantity"]);
        const updatedOrders = state.orders;
        const updatedTotalPrice =
          state.totalAmount + action.item.price * action.item.quantity;
        const updatedTotalItems =
          parseInt(state.totalItems) + parseInt(action.item.quantity);
        return {
          orders: updatedOrders,
          totalAmount: updatedTotalPrice,
          totalItems: updatedTotalItems,
          loggedIn: true,
        };
      }
    }
    if (flag === true) {
      const updatedOrders = state.orders.concat(action.item);
      const updatedTotalPrice =
        state.totalAmount + action.item.price * action.item.quantity;
      const updatedTotalItems =
        parseInt(state.totalItems) + parseInt(action.item.quantity);
      return {
        orders: updatedOrders,
        totalAmount: updatedTotalPrice,
        totalItems: updatedTotalItems,
        loggedIn: true,
      };
    }
  } else if (action.type === "inc") {
    for (let i = 0; i < state.orders.length; i++) {
      if (state.orders[i]["name"] === action.item) {
        state.orders[i]["quantity"] =
          parseInt(state.orders[i]["quantity"]) + parseInt(1);
        const updatedOrders = state.orders;
        const updatedTotalPrice = state.totalAmount + state.orders[i]["price"];
        const updatedTotalItems = parseInt(state.totalItems) + parseInt(1);
        return {
          orders: updatedOrders,
          totalAmount: updatedTotalPrice,
          totalItems: updatedTotalItems,
          loggedIn: true,
        };
      }
    }
  } else if (action.type === "dec") {
    for (let i = 0; i < state.orders.length; i++) {
      // console.log(state.orders[i]["name"] + " " + action.item);
      if (state.orders[i]["name"] === action.item) {
        if (state.orders[i]["quantity"] > 1) {
          state.orders[i]["quantity"] =
            parseInt(state.orders[i]["quantity"]) - parseInt(1);
          const updatedOrders = state.orders;
          const updatedTotalPrice =
            state.totalAmount - state.orders[i]["price"];
          const updatedTotalItems = parseInt(state.totalItems) - parseInt(1);
          return {
            orders: updatedOrders,
            totalAmount: updatedTotalPrice,
            totalItems: updatedTotalItems,
            loggedIn: true,
          };
        } else {
          const filteredOrders = state.orders.filter(
            (item) => item["name"] !== action.item
          );
          const updatedOrders = filteredOrders;
          const updatedTotalPrice =
            state.totalAmount - state.orders[i]["price"];
          const updatedTotalItems = parseInt(state.totalItems) - parseInt(1);
          return {
            orders: updatedOrders,
            totalAmount: updatedTotalPrice,
            totalItems: updatedTotalItems,
            loggedIn: true,
          };
        }
      }
    }
  } else {
    return state;
  }
}

export default StoreReducer;
