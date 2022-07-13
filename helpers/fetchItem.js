const fetchItem = async (item) => {
  try { 
    const URL = `https://api.mercadolibre.com/items/${item}`;
    const request = await fetch(URL);
    const rJson = await request.json();

    return rJson;
  } catch (e) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
