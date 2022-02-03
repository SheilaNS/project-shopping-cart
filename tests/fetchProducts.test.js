require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('fetchProducts deve ser uma função', async () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('ao chamar fetchProducts(\'computador\') o fetch deve ser chamado', async () => {
    expect.assertions(1);
    const response = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se fetch é chamado com o endpoint correto', async () => {
    const response = await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Deve retornar um objeto igual ao computadorSearch', async () => {
    const response = await fetchProducts('computador');
    expect(response).toBe(computadorSearch);
  });

  it('Deve retornar um erro se fetchProducts for chamada sem argumento', async () => {
    const response = await fetchProducts();
    expect(response).toBe('You must provide an url');
  });
});
