const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  test('Espera que ao chamar saveCartItems com <ol><li>Item</li></ol> , localStorage.setItem seja chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  test('Espera que ao chamar saveCartItem com o parâmetro <ol><li>Item</li></ol>, localStorage.setItem seja chamado com cartItems e o <ol><li>Item</li></ol>', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
