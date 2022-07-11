require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const { fetchProducts } = require('../helpers/fetchProducts');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui  
  test('Verify if fetchProducts is a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });
});
