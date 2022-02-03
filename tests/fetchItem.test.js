require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('fetchItem deve ser uma função', async () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('ao chamar fetchItem(\'MLB1615760527\') o fetch deve ser chamado', async () => {
    expect.assertions(1);
    const response = await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se fetch é chamado com o endpoint correto', async () => {
    const response = await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Deve retornar um objeto igual ao item', async () => {
    const response = await fetchItem('MLB1615760527');
    expect(response).toBe(item);
  });

  it('Deve retornar um erro se fetchItem for chamada sem argumento', async () => {
    const response = await fetchItem();
    expect(response).toBe('You must provide an url');
  }); 
});
