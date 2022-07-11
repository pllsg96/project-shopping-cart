require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  test('Verify if fetchProducts is a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  test('Verify if fetch was called, when fetchProducts receive "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('Verify fetch endpoint', () => {
    const epoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(epoint);
  });

  test('Verify if fetchProduct return is equal to computadorSearch', async () => {
    const compReturn = fetchProducts('computador');
    expect(await compReturn).toEqual(computadorSearch);
  });

  test('Verify if fetchProduct with empty parameter, returns a error message', async () => {
    const returnFunc = fetchProducts();
    expect(returnFunc).toBe('You must provide an url');
  });
});
