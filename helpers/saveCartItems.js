const saveCartItems = (arg) => {
  // console.log(arg);
  localStorage.setItem('cartItems', arg);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
