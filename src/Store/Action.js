function addOrder(order) {
  return { type: "add", item: order };
}

function logIn(order, amt, item) {
  return { type: "login", orders: order, amount: amt, items: item };
}
function logOut() {
  return { type: "logout" };
}

function deleteOrder(order) {
  return { type: "delete", item: order };
}

function incrementOrder(order) {
  return { type: "inc", item: order };
}

function decrementOrder(order) {
  return { type: "dec", item: order };
}

export { addOrder, deleteOrder, incrementOrder, decrementOrder, logIn, logOut };
