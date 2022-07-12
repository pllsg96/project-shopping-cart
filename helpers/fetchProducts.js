const fetchProducts = async (stonks) => {
  if (!stonks) throw new Error('You must provide an url');

  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${stonks}`; 
  const result = await fetch(URL);
  const resultJson = await result.json();
  return resultJson;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
