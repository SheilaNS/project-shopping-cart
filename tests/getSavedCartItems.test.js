const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('ao chamar a função o localStorage.getItem deve ser chamado', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('ao chamar a função o localStorage.getItem deve ser chamado com 2 parâmetros, \'carItems\'', () => {
    getSavedCartItems();
    const param = 'cartItems';
    expect(localStorage.getItem).toHaveBeenCalledWith(param);
  });
});
