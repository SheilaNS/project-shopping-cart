const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('ao chamar a função o localStorage.setItem deve ser chamado', () => {
    expect.assertions(1);
    getSavedCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('ao chamar a função com o parâmetro \'<ol><li>Item</li></ol>\' o localStorage.setItem deve ser chamado com 2 parâmetros, \'carItems\' e \'<ol><li>Item</li></ol>\'', () => {
    getSavedCartItems('<ol><li>Item</li></ol>');
    const param = 'cartItems';
    expect(localStorage.getItem).toHaveBeenCalledWith(param);
  });
});
