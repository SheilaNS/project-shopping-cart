const getSavedCartItems = (list) => {
  const cartList = list;
  cartList.innerHTML = localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
