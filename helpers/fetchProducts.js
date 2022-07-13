const fetchProducts = async (stonks) => {
  if (!stonks) throw new Error('You must provide an url');

  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${stonks}`; 
  const request = await fetch(URL);
  const data = await request.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
