export const searchForServerSide = () => {
  // It will be server side search for server side pagination
};

export const searchOrderWithId = (orderId, orderArray) => {
  return orderArray.filter((order) => order._id.indexOf(orderId) != -1);
};
