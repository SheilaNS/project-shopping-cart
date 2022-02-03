const itemUrl = (param) => `https://api.mercadolibre.com/items/${param}`;

const fetchItem = async (param) => {
  try {
    const url = itemUrl(param);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return 'You must provide an url';
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
