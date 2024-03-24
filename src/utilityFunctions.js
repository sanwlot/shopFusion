export function getCartTotal(cart) {
  return cart?.reduce(
    (accumulator, currentVal) => currentVal.price + accumulator,
    0
  );
}
export function getUserName(user) {
  if (user) {
    let username = user?.email.split("@")[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
  }
  return "Guest";
}
