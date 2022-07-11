const fetchProducts = async (stonks) => {
  // seu código aqui
  try {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${stonks}`; 
    const result = await fetch(URL);
    const resultJson = await result.json();
    return resultJson;
  } catch (e) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
