require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui  zz
  test('Espera que a fetchItem seja uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  test('Espera que ao receber MLB1615760527, a função retorna o endpoint https://api.mercadolibre.com/items/MLB1615760527', () => {
    const ePoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(ePoint);
  });

  test('Verifica se ao receber como parâmetro MLB1615760527, o retorno de fetchItem é uma estrutura de dados igual a item', async () => {
    const fItem = fetchItem('MLB1615760527');
    expect(await fItem).toEqual(item);
  })

  test('Testa de ao chamar fetchItem vazio, retorna You must provide an url', () => {
    const returnFunc = fetchItem();
    expect(returnFunc).rejects.toThrow('You must provide an url');
  })
});
