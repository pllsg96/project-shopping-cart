const saveCartItems = (arg) => {
  // console.log(arg);
  const x = arg.innerHTML;
  // console.log(x);

  localStorage.setItem('cartItems', x);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
