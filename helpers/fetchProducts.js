const fetchProducts = async (param) => {
  try {
    const productUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${param}`;
    const url = productUrl;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return 'You must provide an url';
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
