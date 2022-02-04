const getSavedCartItems = (param) => localStorage.getItem(param);

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
