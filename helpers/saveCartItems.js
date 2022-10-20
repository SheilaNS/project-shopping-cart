const saveCartItems = (list) => localStorage.setItem('cartItems', list);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
