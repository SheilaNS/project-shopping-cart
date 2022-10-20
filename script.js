const CART_OL = '.cart__items';

// remove um item do localStorage
const localFilter = (id) => {
  const cart = JSON.parse(getSavedCartItems());
  cartList = cart.filter((elem) => elem.id !== id);
  saveCartItems(JSON.stringify(cartList));
};

// salva a lista de items no localStorage
const localSave = (obj) => {
  const cart = JSON.parse(getSavedCartItems());
  const cartList = cart || [];
  cartList.push(obj);
  saveCartItems(JSON.stringify(cartList));
};

// calcula o valor total dos items no carrinho
const totalPrice = () => {
  const cartItems = document.querySelectorAll('.cart__item');
  let sum = 0;
  cartItems.forEach((elem) => {
    const price = elem.innerText.split('$')[1];
    sum += Number(price);
  });
  const totalPriceSpam = document.querySelector('.total-price');
  totalPriceSpam.innerText = `${sum.toFixed(2)}`;
};

// limpa os items do carrinho
const clearButton = document.querySelector('.empty-cart');
clearButton.addEventListener('click', () => {
  const cartOl = document.querySelector(CART_OL);
  cartOl.innerText = '';
  localStorage.clear();
  totalPrice();
});

// cria a tag de imagem do produto
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

// cria uma tag de forma dinâmica
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

// cria o item do carrinho
const createCartItemElement = ({ id, title, price }) => {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
    li.addEventListener('click', (event) => {
      const itemId = event.target.innerText.split(' ')[1];
      event.target.remove();
      localFilter(itemId);
      totalPrice();  
    });
    return li;
  };
  
  // adiciona o item no carrinho
  const addToCart = async (event) => {
    const prodId = event.target.parentNode.firstChild.innerText;
    const data = await fetchItem(prodId);
    const cartOl = document.querySelector(CART_OL);
    const cartItem = createCartItemElement(data);
    cartOl.appendChild(cartItem);
    localSave(data);
    totalPrice();
  };

// cria o card do produto
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  const addCartButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addCartButton.addEventListener('click', addToCart);
  section.appendChild(addCartButton);
  return section;
};

// renderiza os produtos na tela
const addProducts = async () => {
  const data = await fetchProducts('computador');
  const { results } = data;
  const itemsSection = document.querySelector('.items');
  results.forEach((element) => {
    const products = createProductItemElement(element);
    itemsSection.appendChild(products);    
  });
};

// recupera os itens do carrinho no localStorage
const loadCart = () => {
  const localCart = getSavedCartItems();
  const localParse = JSON.parse(localCart) || [];
  const cartOl = document.querySelector(CART_OL);
  localParse.forEach((elem) => {
    const product = createCartItemElement(elem);
    cartOl.appendChild(product);
  });
  totalPrice();
};

// cria o elemento carregando
const loadingCreate = () => {
  const itemsSection = document.querySelector('.items');
  const loadingSpan = document.createElement('span');
  loadingSpan.innerText = 'carregando...';
  loadingSpan.className = 'loading';
  itemsSection.appendChild(loadingSpan);
};

// remove o elemento carregando
const loadingClear = () => {
  const loadingSpan = document.querySelector('.loading');
  loadingSpan.remove();
};

// chama as funções ao carregar a tela
window.onload = async () => {
  loadingCreate();
  await addProducts();
  loadingClear();
  loadCart();
};