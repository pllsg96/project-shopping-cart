const fetchItem = async (itemID) => {
  try { 
    const URL = `https://api.mercadolibre.com/items/${itemID}`;
    const request = await fetch(URL);
    const rJson = await request.json();

    return rJson;
  } catch (e) {
    throw new Error('You must provide an url');
  }
};

// "MLB1341706310"

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
