const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('ao chamar a função com o parâmetro \'<ol><li>Item</li></ol>\' o localStorage.setItem deve ser chamado', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('ao chamar a função com o parâmetro \'<ol><li>Item</li></ol>\' o localStorage.setItem deve ser chamado com 2 parâmetros, \'carItems\' e \'<ol><li>Item</li></ol>\'', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    const param1 = 'cartItems';
    const param2 = '<ol><li>Item</li></ol>';  
    expect(localStorage.setItem).toHaveBeenCalledWith(param1, param2);
  });
});
